import { useMDXComponents as getThemeComponents } from 'nextra-theme-blog'

export function useMDXComponents(components: any) {
    const themeComponents = getThemeComponents(components)
    return {
        ...themeComponents,
        ...components
    }
}
