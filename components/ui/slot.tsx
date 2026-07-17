import * as React from "react"
import { cn } from "@/lib/utils"

function composeEventHandlers(
  originalEventHandler?: React.EventHandler<React.SyntheticEvent>,
  ourEventHandler?: React.EventHandler<React.SyntheticEvent>,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: React.SyntheticEvent) {
    originalEventHandler?.(event)
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      ourEventHandler?.(event)
    }
  }
}

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

const Slot = React.forwardRef<HTMLElement, SlotProps>((props, ref) => {
  const { children, ...slotProps } = props

  if (!React.isValidElement(children)) {
    return null
  }

  const childProps = { ...(children.props as React.HTMLAttributes<HTMLElement>) }

  // Merge classNames
  const mergedClassName = cn(slotProps.className, childProps.className)

  // Merge styles
  const mergedStyle = { ...slotProps.style, ...childProps.style }

  // Merge event handlers
  const mergedProps: Record<string, unknown> = {
    ...childProps,
    className: mergedClassName,
    style: mergedStyle,
  }

  for (const key of Object.keys(slotProps)) {
    if (key.startsWith("on") && typeof (slotProps as Record<string, unknown>)[key] === "function") {
      const slotHandler = (slotProps as Record<string, unknown>)[key] as React.EventHandler<React.SyntheticEvent>
      const childHandler = (childProps as Record<string, unknown>)[key] as React.EventHandler<React.SyntheticEvent> | undefined
      mergedProps[key] = composeEventHandlers(childHandler, slotHandler)
    } else if (key !== "className" && key !== "style" && key !== "children") {
      mergedProps[key] = (slotProps as Record<string, unknown>)[key]
    }
  }

  // Handle ref forwarding
  if (ref) {
    mergedProps.ref = ref
  } else if (children && typeof children === "object" && "props" in children) {
    const childRef = (children.props as { ref?: React.Ref<unknown> }).ref
    if (childRef) {
      mergedProps.ref = childRef
    }
  }

  return React.cloneElement(children, mergedProps as Record<string, unknown>)
})
Slot.displayName = "Slot"

export { Slot, composeEventHandlers }
