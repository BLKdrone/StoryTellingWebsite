// Shared types for the storytelling engine.

export type StoryType =
  | 'text-whale'
  | 'question'
  | 'animation'
  | 'collect-answer'
  | 'reflection-input'
  | 'transition'

// How the user moves forward from a page.
// - "tap-anywhere": the whole screen is tappable (text-whale, animation)
// - "button": an explicit control advances (question, collect-answer, reflection-input)
// transition pages ignore this and advance automatically when their animation ends.
export type Navigation = 'tap-anywhere' | 'button'

export interface StoryPageData {
  /** Unique, url-safe id used as the route segment. */
  id: string
  type: StoryType
  navigation: Navigation

  // Shared presentation props for every variant.
  /** Path to a real background image. Left empty for now — supplied separately. */
  background: string
  /** Placeholder solid color shown while there is no background image. */
  backgroundColor: string
  /** Path to a sound file to play on this page. Empty = silent. */
  sound: string
  /** Name of a transition/animation effect for this page. */
  transition: string

  // Optional content fields, used depending on `type`.
  title?: string
  text?: string
  /** For "question": the prompt. */
  question?: string
  /** For "question": selectable answers. */
  options?: string[]
  /** For "collect-answer" / "reflection-input": the prompt shown above the field. */
  prompt?: string
  /** For input variants: placeholder text inside the field. */
  placeholder?: string
  /** Label for the advance button on "button" navigation pages. */
  buttonLabel?: string
  /** For "animation" / "transition": how long (ms) before it is considered finished. */
  duration?: number
}
