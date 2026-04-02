'use client'

import { type ComponentType, type SVGProps, useEffect, useState } from 'react'

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  iconName: string
  size?: number | string
}

const getIconCandidates = (iconName: string) => {
  const direct = iconName
  const slashPath = iconName.replace(/-/, '/')

  return Array.from(new Set([direct, slashPath]))
}

export default function Icon({ iconName, size = 16, ...rest }: IconProps) {
  const [Svg, setSvg] = useState<SvgComponent | null>(null)

  useEffect(() => {
    let active = true

    const loadIcon = async () => {
      for (const candidate of getIconCandidates(iconName)) {
        try {
          const iconModule = await import(`./svg/${candidate}.svg`)
          if (active) {
            setSvg(() => iconModule.default)
          }
          return
        } catch {
          continue
        }
      }

      if (active) {
        setSvg(null)
      }
    }

    loadIcon()

    return () => {
      active = false
    }
  }, [iconName])

  if (!Svg) {
    return null
  }

  return <Svg width={size} height={size} {...rest} />
}
