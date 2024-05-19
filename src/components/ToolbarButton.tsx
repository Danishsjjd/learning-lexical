import { ComponentPropsWithoutRef } from "react"

const spacedClasses = "mr-0.5",
  activeClasses = "bg-gray-300"
export const itemClasses =
  "rounded-lg border-0 bg-none p-2 text-sm opacity-60 disabled:opacity-20 disabled:cursor-not-allowed [&>span]:flex [&>span]:aspect-square [&>span]:size-6 [&>span]:items-center [&>span]:justify-center"
const ToolbarButton = ({ className, active, ...props }: ComponentPropsWithoutRef<"button"> & { active?: boolean }) => {
  return <button className={`${itemClasses} ${spacedClasses} ${active ? activeClasses : ""} ${className}`} {...props} />
}

export default ToolbarButton
