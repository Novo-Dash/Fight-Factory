import { cn } from '../../lib/utils'

interface ImagePlaceholderProps {
  className?: string
  aspectRatio?: string
  label?: string
}

export function ImagePlaceholder({
  className,
  aspectRatio = 'aspect-video',
  label = 'Image coming soon',
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative w-full bg-[#EFEFEF] border border-[#D8D8D8] flex items-center justify-center overflow-hidden',
        aspectRatio,
        className
      )}
    >
      <div className="text-center p-4">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-2 opacity-30"
        >
          <rect width="40" height="40" rx="4" fill="#D8D8D8" />
          <path
            d="M8 28L16 18L22 24L28 16L32 28H8Z"
            fill="#AAAAAA"
          />
          <circle cx="14" cy="14" r="3" fill="#AAAAAA" />
        </svg>
        <p className="text-[#AAAAAA] text-xs uppercase tracking-widest">{label}</p>
      </div>
    </div>
  )
}
