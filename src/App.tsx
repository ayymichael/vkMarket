import './App.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  usePlatform,
  CardGrid,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Card from './components/Card'
import Cart from './components/Cart'
import { Product } from './components/redux/Product/types'
import { selectProduct } from './components/redux/Product/selectors'
import { useAppDispatch } from './components/redux/store'
import { fetchProducts } from './components/redux/Product/asyncActions'

const App = () => {
  const platform = usePlatform()
  const { items, status } = useSelector(selectProduct)
  const dispatch = useAppDispatch()

  const getProducts = async () => {
    dispatch(fetchProducts())
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <AppRoot>
      <SplitLayout
        header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>vk market</PanelHeader>
              <SplitLayout>
                <SplitCol width={100}>
                  <Group
                    style={{ margin: '20px' }}
                    mode="plain"
                    header={<Header mode="secondary">Список товаров</Header>}
                  >
                    <CardGrid size="l">
                      {status === 'error' ? (
                        <h4>Произошла ошибка при загрузке товаров</h4>
                      ) : (
                        items.map((product: Product) => (
                          <Card
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            quantity={product.quantity}
                            thumbnail={product.thumbnail}
                          />
                        ))
                      )}
                    </CardGrid>
                  </Group>
                </SplitCol>
                <SplitCol width={100}>
                  <Group
                    style={{ margin: '20px' }}
                    mode="plain"
                    header={<Header mode="secondary">Корзина</Header>}
                  >
                    <CardGrid size="l">
                      <Cart />
                    </CardGrid>
                  </Group>
                </SplitCol>
              </SplitLayout>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  )
}

export default App
