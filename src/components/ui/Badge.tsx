import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-[0.6875rem] tracking-[0.12em] uppercase font-semibold text-[#0A0A0A]',
        className
      )}
    >
      {children}
    </span>
  )
}
