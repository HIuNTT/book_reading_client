import { useNavigate } from 'react-router-dom'
import { cn } from 'utils/cn'

interface LogoProps {
  collapsed: boolean
}

export default function Logo({ collapsed }: LogoProps) {
  const navigate = useNavigate()

  return (
    <div className="ml-6 flex h-16 items-center overflow-hidden whitespace-nowrap">
      <div className="flex cursor-pointer items-center" onClick={() => navigate('/')}>
        <img className={cn('mr-2.5 h-8', { 'mr-0': collapsed })} src="/logo.svg" />
        {!collapsed && <img className="h-5" src="/img/logo waka rose.png" />}
      </div>
    </div>
  )
}
