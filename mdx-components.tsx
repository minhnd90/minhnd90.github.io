import { useMDXComponents as getThemeComponents } from 'nextra-theme-blog'
import React from 'react'

export function useMDXComponents(components: any) {
  const themeComponents = getThemeComponents(components)
  return {
    ...themeComponents,
    wrapper(props: any) {
      const original = themeComponents.wrapper(props)
      if (React.isValidElement(original)) {
        const originalProps = original.props as { children?: React.ReactNode[] }
        if (originalProps && Array.isArray(originalProps.children)) {
          // The original wrapper returns a Fragment with [h1, Meta, children]
          // We slice(1) to remove the h1, and just keep Meta and the actual content
          return React.cloneElement(original, {
            children: originalProps.children.slice(1)
          } as React.Attributes & { children: React.ReactNode })
        }
      }
      return original
    },
    ...components
  }
}
