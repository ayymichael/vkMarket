import { Card } from '@vkontakte/vkui'
import { selectCart } from './redux/Cart/selectors'
import { useAppDispatch } from './redux/store'
import { useSelector } from 'react-redux'

const Cart = () => {
  const dispatch = useAppDispatch()
  const { totalPrice, items } = useSelector(selectCart)

  return (
    <Card>
      <div style={{ height: 96, padding: '15px' }}>
        <h4>Итого: {totalPrice} руб.</h4>
      </div>
    </Card>
  )
}

export default Cart
