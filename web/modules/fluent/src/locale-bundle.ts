import { FluentBundle, FluentResource, type FluentVariable } from "@fluent/bundle"
import { FluentComponent } from "./component"
import { LOCALE_COMPONENTS } from "./locales"

/** Class that handles translations/formatting for a specific locale. */
export class Locale {
  /** Internal bundle that stores and formats messages. */
  private declare bundle: FluentBundle

  /** The primary locale. */
  declare locale: string

  /**
   * Fallback locales that are used only if the primary locale isn't
   * available for a message.
   */
  declare fallbacks: string[]

  /**
   * Every locale supported, with the primary locale being the first
   * index and the fallbacks being the rest.
   */
  declare supported: string[]

  /** A set containing every component that has already been loaded. */
  declare loadedComponents: Set<FluentComponent>

  /** @param locales - Locale strings. First locale is the primary one. */
  constructor(...locales: string[]) {
    this.locale = locales[0]
    this.fallbacks = locales.slice(1)
    this.supported = [...locales]
    this.loadedComponents = new Set()
    this.bundle = new FluentBundle(this.locale)
  }

  /**
   * Adds a new resource or component to the locale.
   *
   * @param resource - The resource/component to add.
   */
  async add(resource: FluentResource | FluentComponent) {
    if (resource instanceof FluentResource) {
      const errors = this.bundle.addResource(resource)
      errors.forEach(err => console.error(err))
    } else {
      if (this.loadedComponents.has(resource)) return

      const supported = resource.which(this.supported)

      if (!supported) {
        console.warn(`Locale ${this.locale} isn't supported by ${resource.component}`)
        return
      }

      if (supported !== this.locale) {
        console.warn(`Fellback to locale ${supported} for ${resource.component}`)
      }

      const supportedResource = await resource.load(supported)

      const errors = this.bundle.addResource(supportedResource)
      errors.forEach(err => console.error(err))

      this.loadedComponents.add(resource)
    }
  }

  /**
   * Loads and adds a component by name.
   *
   * @param component - The name of the component to load.
   */
  async load(component: string) {
    // check if we've already loaded this component
    for (const loaded of this.loadedComponents) {
      if (loaded.component === component) return
    }

    if (!LOCALE_COMPONENTS.has(component)) {
      throw new Error(`Unknown component: ${component}`)
    }

    await this.add(LOCALE_COMPONENTS.get(component)!)
  }

  /**
   * Checks if the given message ID is in this locale's bundle.
   *
   * @param id - The ID of the message to check.
   */
  has(id: string) {
    return this.bundle.hasMessage(id)
  }

  /**
   * Formats a message via its ID.
   *
   * @param id - The ID of the message.
   * @param data - Data to pass to the message's pattern when formatting.
   */
  format(id: string, data?: Record<string, FluentVariable>) {
    const message = this.bundle.getMessage(id)

    if (!message || !message.value) {
      console.warn("Missing message:", id)
      return id
    }

    const errors: Error[] = []
    const result = this.bundle.formatPattern(message.value, data, errors)
    errors.forEach(err => console.error(err))
    return result
  }

  /**
   * Formats a number.
   *
   * @param n - The number to format.
   * @param opts - Options for formatting.
   */
  number(n: number, opts?: Intl.NumberFormatOptions) {
    const formatter = new Intl.NumberFormat(this.supported, opts)
    return formatter.format(n)
  }

  /**
   * Formats a number as a unit, e.g. `20mm`.
   *
   * @param n - The number to format.
   * @param unit - The unit to use.
   * @param opts - Options for formatting.
   */
  unit(n: number, unit: UnitString, opts?: UnitFormatOptions) {
    const formatter = new Intl.NumberFormat(this.supported, {
      style: "unit",
      unit,
      ...opts
    })
    return formatter.format(n)
  }
}

export interface UnitFormatOptions {
  compactDisplay?: "short" | "long"
  notation?: "standard" | "scientific" | "engineering" | "compact"
  signDisplay?: "auto" | "never" | "always"
  unitDisplay?: "short" | "long" | "narrow"
  useGrouping?: boolean
}

// Sourced from:
// https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier
/** All valid `Intl` units. */
export type Units =
  | "acre"
  | "bit"
  | "byte"
  | "celsius"
  | "centimeter"
  | "day"
  | "degree"
  | "fahrenheit"
  | "fluid-ounce"
  | "foot"
  | "gallon"
  | "gigabit"
  | "gigabyte"
  | "gram"
  | "hectare"
  | "hour"
  | "inch"
  | "kilobit"
  | "kilobyte"
  | "kilogram"
  | "kilometer"
  | "liter"
  | "megabit"
  | "megabyte"
  | "meter"
  | "mile"
  | "mile-scandinavian"
  | "milliliter"
  | "millimeter"
  | "millisecond"
  | "minute"
  | "month"
  | "ounce"
  | "percent"
  | "petabyte"
  | "pound"
  | "second"
  | "stone"
  | "terabit"
  | "terabyte"
  | "week"
  | "yard"
  | "year"

/** A valid `Intl` unit string, e.g. "kilobyte" or "kilobyte-per-minute". */
export type UnitString = Units | `${Units}-per-${Units}`
