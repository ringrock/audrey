import { FC, useEffect } from 'react'
import { Menu, MenuItem, Sidebar, menuClasses, sidebarClasses } from 'react-pro-sidebar'
import { ChevronDoubleLeft, ChevronDoubleRight } from 'react-bootstrap-icons'
import styles from '../Sidebar/Sidebar.module.css'
import { pdfList } from '../../api'

const mockData = {
  '0010-2022.pdf': 'https://leyes.azureedge.net/webpage-ley73/0010-2022.pdf',
  'Archivo-2': 'http://www.google.com',
  'Archivo-3': 'http://www.google.com',
  'Archivo-4': 'http://www.google.com',
  'Archivo-5': 'http://www.google.com',
  'Archivo-6': 'http://www.google.com',
  'Archivo-7': 'http://www.google.com',
  'Archivo-8': 'http://www.google.com',
  'Archivo-9': 'http://www.google.com',
  'Archivo-10': 'http://www.google.com',
  'Archivo-11': 'http://www.google.com',
  'Archivo-12': 'http://www.google.com',
  'Archivo-13': 'http://www.google.com',
  'Archivo-14': 'http://www.google.com',
  'Archivo-15': 'http://www.google.com',
  'Archivo-16': 'http://www.google.com',
  'Archivo-17': 'http://www.google.com',
  'Archivo-18': 'http://www.google.com'
}

/*
Bug al pasar de celular a pc pantalla
Mejorar SidebarMenuProps
Cambiar fondo mobile vista mas blanco no tan transparente 
Ajustar para nombres largos salto de linea
Ver posibilidad visualizar PDF en la misma pagina con un modal
Ver posibilidad cambiar iconos 
Optimizar
*/

interface SidebarMenuProps {
  collapsed: boolean
  toggled: boolean
  handleToggleSidebar: any
  handleCollapsedChange: any
  children: React.ReactNode
}

const SidebarMenu: FC<SidebarMenuProps> = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
  children
}) => {
  useEffect(() => {
    const getPdfList = async () => {
      pdfList()
        .then(response => {
          console.log(response)
        })
        .catch(_err => {
          console.error('There was an issue fetching your data.')
        })
    }
    getPdfList()
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'fixed', width: '100%' }}>
      <Sidebar
        className="app"
        onBackdropClick={() => handleToggleSidebar(false)}
        toggled={toggled}
        breakPoint="md"
        collapsed={toggled ? false : collapsed}
        rootStyles={
          collapsed && !toggled
            ? {
                ['.' + sidebarClasses.container]: {
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  }
                }
              }
            : {
                ['.' + sidebarClasses.container]: {
                  '&::-webkit-scrollbar': {
                    width: '5px',
                    height: '5px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '3px'
                  },
                  '&::-webkit-scrollbar-track': {
                    height: '20px',
                    marginBlock: '-3px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#334768',
                    borderRadius: '3px'
                  }
                }
              }
        }>
        <Menu>
          {toggled ? (
            false
          ) : collapsed ? (
            <MenuItem
              icon={<ChevronDoubleRight color="#334768" size={20} />}
              onClick={handleCollapsedChange}
              rootStyles={{
                ['.' + menuClasses.button]: {
                  color: '#fbfbfb',
                  '&:hover': {
                    backgroundColor: '#eecef9'
                  }
                }
              }}></MenuItem>
          ) : (
            <MenuItem
              suffix={<ChevronDoubleLeft color="#334768" size={20} />}
              onClick={handleCollapsedChange}
              rootStyles={{
                ['.' + menuClasses.button]: {
                  color: '#fbfbfb',
                  '&:hover': {
                    backgroundColor: '#eecef9'
                  }
                }
              }}></MenuItem>
          )}
          {Object.entries(mockData).map(([key, value]) => (
            <MenuItem
              style={collapsed && !toggled ? { visibility: 'hidden' } : { color: '#201F1E' }}
              onClick={() => {
                window.open(value)
              }}>
              {key}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
      <main className={`col ${styles.conteiner}`}>{children}</main>
    </div>
  )
}

export default SidebarMenu