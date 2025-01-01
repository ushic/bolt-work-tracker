import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import i18n from '../../i18n'

const Sidebar = ({ className, router }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState([])

  const navItems = [
    {
      icon: 'home',
      text: i18n.t('navigation.dashboard'),
      subItems: [
        { icon: 'tachometer-alt', text: i18n.t('navigation.myDashboard'), path: '/my-dashboard' },
        { icon: 'tasks', text: i18n.t('navigation.myActions'), path: '/my-actions' },
        { icon: 'box', text: i18n.t('navigation.myAssets'), path: '/my-assets' },
        { icon: 'calendar', text: i18n.t('navigation.calendar'), path: '/calendar' }
      ]
    },
    // ... rest of your navigation items
  ]

  const toggleExpanded = (index) => {
    setExpandedItems(prev => {
      const isExpanded = prev.includes(index)
      return isExpanded 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    })
  }

  const SidebarContent = () => (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-2 px-4 text-lg font-semibold">
            {i18n.t('app.title')}
          </div>
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <div key={index}>
                <Button
                  variant={expandedItems.includes(index) ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => toggleExpanded(index)}
                >
                  <i className={`fas fa-${item.icon} mr-2`} />
                  {item.text}
                  {item.subItems && (
                    <i className={`fas fa-chevron-${expandedItems.includes(index) ? 'up' : 'down'} ml-auto`} />
                  )}
                </Button>
                {item.subItems && expandedItems.includes(index) && (
                  <div className="pl-6 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Button
                        key={subIndex}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          router.navigate(subItem.path)
                          setIsOpen(false)
                        }}
                      >
                        <i className={`fas fa-${subItem.icon} mr-2`} />
                        {subItem.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <aside className="hidden md:block fixed inset-y-0 z-30 w-72">
        <SidebarContent />
      </aside>
    </>
  )
}

export default Sidebar
