import { useMDXComponents as getThemeComponents } from 'nextra-theme-blog'



const themeComponents = {
    // Define custom MDX components if needed, or import from theme
    // For now we will return empty or default
}

export function useMDXComponents(components: any) {
    return {
        ...themeComponents,
        ...components
    }
}
