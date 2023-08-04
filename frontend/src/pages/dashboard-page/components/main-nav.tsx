import { Link } from 'react-router-dom' 

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        to="/projects"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Projects
      </Link>
      <Link
        to="/examples/tasks"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tasks
      </Link>
      <Link
        to="/examples/notes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Notes
      </Link>
      <Link
        to="/examples/costs"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Costs
      </Link>
      <Link
        to="/examples/estimates"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Estimates
      </Link>
      <Link
        to="/examples/calculate"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Calculate
      </Link>
      <Link
        to="/examples/convert"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Convert
      </Link>
    </nav>
  )
}
