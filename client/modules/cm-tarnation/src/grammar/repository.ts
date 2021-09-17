import type * as DF from "./definition"
import { Node } from "./node"
import { LookupRule } from "./rules/lookup"
import { PatternRule } from "./rules/pattern"
import { Rule } from "./rules/rule"
import { State } from "./rules/state"
import type { VariableTable } from "./types"

export class Repository {
  private map = new Map<string | number, Node | Rule | State>()
  private curID = 0

  constructor(
    public variables: VariableTable,
    public ignoreCase = false,
    public includes: Record<string, string[]> = {}
  ) {}

  nodes() {
    // deduplicates, runs the iterator
    const set = new Set(this.map.values())
    // get every node, remove any entries that are Node.None
    return Array.from(set)
      .map(v => (v instanceof Node ? v : v.node))
      .filter(v => v !== Node.None)
  }

  private id() {
    const id = this.curID
    this.curID++
    return id
  }

  add(state: DF.State, name?: string): State
  add(rule: DF.Regex | DF.Rule, name?: string): Rule
  add(node: DF.Node | DF.ReuseNode, name?: string): Node
  add(obj: DF.RepositoryItem, name?: string): Node | Rule | State
  add(obj: DF.RepositoryItem, name?: string): Node | Rule | State {
    // match pattern shorthand
    if (typeof obj === "string") {
      if (!name) throw new Error("name is required for shorthands")
      const pattern: DF.Pattern = { type: name, emit: false, match: obj }
      return this.add(pattern, name)
    }

    // node open bracket shorthand
    if ("open" in obj) {
      const node: DF.Node = {
        ...obj,
        type: `${obj.open}Open`,
        closedBy: `${obj.open}Close`
      }
      // @ts-ignore
      delete node.open
      return this.add(node, name)
    }

    // node close bracket shorthand
    if ("close" in obj) {
      const node: DF.Node = {
        ...obj,
        type: `${obj.close}Close`,
        openedBy: `${obj.close}Open`
      }
      // @ts-ignore
      delete node.close
      return this.add(node, name)
    }

    // make sure we have a name/type for the node
    if (!("is" in obj) && !("template" in obj)) {
      if (name && !obj.type) obj = { ...obj, type: name }
    }

    // reused node
    if ("is" in obj) {
      return this.get(obj.is)!
    }
    // templates
    else if ("template" in obj) {
      // TODO: template
      throw new Error("not implemented")
    }
    // lookup
    else if ("lookup" in obj) {
      const id = this.id()
      const lookup = new LookupRule(this, id, obj)
      this.map.set(id, lookup)
      this.map.set(lookup.name, lookup)
      return lookup
    }
    // pattern
    else if ("match" in obj) {
      const id = this.id()
      const pattern = new PatternRule(this, id, obj)
      this.map.set(id, pattern)
      this.map.set(pattern.name, pattern)
      this.variables[pattern.name] = obj.match
      return pattern
    }
    // chain
    else if ("chain" in obj) {
      // TODO: chain
      throw new Error("not implemented")
    }
    // state
    else if ("begin" in obj) {
      const id = this.id()
      const state = new State(this, id, obj)
      this.map.set(id, state)
      this.map.set(state.name, state)
      return state
    }
    // must be a node
    else {
      const id = this.id()
      const node = new Node(id, obj)
      this.map.set(id, node)
      this.map.set(node.name, node)
      return node
    }
  }

  get(key: string | number) {
    return this.map.get(key)
  }

  include(str: string) {
    if (!this.includes[str]) throw new Error(`include ${str} not found`)
    return this.includes[str]
      .map(name => this.get(name)!)
      .filter(rule => !(rule instanceof Node)) as (Rule | State)[]
  }

  inside(rules: DF.Inside) {
    const inside = []
    for (const rule of rules) {
      // specifier for a rule
      if (typeof rule === "string") {
        const resolved = this.get(rule)
        if (!(resolved instanceof Rule)) throw new Error(`Invalid inside rule`)
        inside.push(resolved)
      }
      // include
      else if ("include" in rule) {
        inside.push(...this.include(rule.include))
      }
      // state
      else {
        inside.push(this.add(rule))
      }
    }
    return inside
  }
}
