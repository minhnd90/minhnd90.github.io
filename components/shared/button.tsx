'use client'

import { Button, type ButtonProps as MuiButtonProps, type SxProps, type Theme } from '@mui/material'
import Link, { type LinkProps } from 'next/link'
import type { ReactNode } from 'react'

export interface AppButtonProps extends Omit<MuiButtonProps, 'href'> {
  href?: LinkProps['href']
  linkProps?: Omit<LinkProps, 'href'>
  children?: ReactNode
}

const isExternalHref = (href?: LinkProps['href']) => {
  if (typeof href !== 'string') return false
  return /^(https?:|mailto:|tel:)/.test(href)
}

export default function AppButton({ href, linkProps, children, sx, ...props }: AppButtonProps) {
  const mergedSx: SxProps<Theme> = [{ textTransform: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]

  if (href && !isExternalHref(href)) {
    return (
      <Button component={Link} href={href as any} sx={mergedSx} {...linkProps} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <Button component={href ? 'a' : undefined} href={href as string | undefined} sx={mergedSx} {...props}>
      {children}
    </Button>
  )
}
