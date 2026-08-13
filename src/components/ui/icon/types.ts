export type IconProps = {
  src: string
  alt?: string
  className?: string
  /** Fires once the icon markup (inlined svg or loaded image) is in the DOM. */
  onReady?: () => void
}
