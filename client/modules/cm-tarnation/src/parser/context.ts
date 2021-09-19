import type { SerializedParserContext } from "../types"
import { ParserBuffer } from "./buffer"
import { ParserStack } from "./stack"

/**
 * Context/state object for the parser. State is stored separately from the
 * parser, so that it may be recovered from a cache later and be reused.
 */
export class ParserContext {
  /**
   * @param pos - The starting document position of the parser.
   * @param index - The index of the next token to be parsed.
   * @param buffer - The parser's token buffer.
   * @param stack - The parsers's stack.
   */
  constructor(
    public pos: number,
    public index: number = 0,
    public buffer: ParserBuffer = new ParserBuffer(),
    public stack: ParserStack = new ParserStack()
  ) {}

  /**
   * Serializes the context.
   *
   * @param full - If true, the `ParserBuffer` will be cloned deeply
   *   instead of being a shallow clone.
   */
  serialize(full = false): SerializedParserContext {
    return {
      pos: this.pos,
      index: this.index,
      buffer: full ? this.buffer.clone(true) : this.buffer.shallow(),
      stack: this.stack.serialize()
    }
  }

  /**
   * Returns a clone of the context.
   *
   * @param full - If true, the `ParserBuffer` will be cloned deeply
   *   instead of being a shallow clone.
   */
  clone(full = false) {
    return ParserContext.deserialize(this.serialize(full))
  }

  /** Deserializes a serialized context and returns a new `ParserContext`. */
  static deserialize(serialized: SerializedParserContext) {
    return new ParserContext(
      serialized.pos,
      serialized.index,
      new ParserBuffer(serialized.buffer),
      new ParserStack(serialized.stack)
    )
  }
}
