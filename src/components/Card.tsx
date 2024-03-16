import React from 'react'
import { Button, Card } from '@vkontakte/vkui'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, minusItem, removeItem } from '../components/redux/Cart/slice'
import { CartItem } from './redux/Cart/types'
import { selectCartItemById } from './redux/Cart/selectors'

type CardProps = {
  id: number
  title: string
  price: number
  quantity: number
  thumbnail: string
}

const CardItem: React.FC<CardProps> = ({
  id,
  title,
  price,
  quantity,
  thumbnail,
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const count = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      count: 0,
    }
    dispatch(addItem(item))
  }

  const onClickRemove = () => {
    dispatch(removeItem(String(id)))
  }

  const onClickMinus = () => {
    dispatch(minusItem(String(id)))
  }

  return (
    <Card>
      <img alt='item' src={thumbnail} style={{ maxWidth: '100px', padding: '15px' }}></img>
      <div style={{ height: 96, padding: '15px' }}>
        <div>
          <div style={{ marginBottom: '5px' }}>{title}</div>
          <div style={{ marginBottom: '5px' }}>Доступно: {quantity} шт.</div>
          <div>Цена: {price}руб.</div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
          }}
        >
          <Button
            align={'center'}
            rounded={true}
            mode={'primary'}
            disabled={count === 10}
            size={'s'}
            loading={false}
            onClick={onClickAdd}
          >
            +
          </Button>
          <Button
            align={'center'}
            rounded={true}
            mode={'primary'}
            disabled={count === 0}
            size={'s'}
            loading={false}
            style={{ marginLeft: '10px' }}
            onClick={onClickMinus}
          >
            -
          </Button>
          <Button
            align={'center'}
            rounded={true}
            mode={'primary'}
            disabled={count === 0}
            appearance="overlay"
            size={'s'}
            loading={false}
            style={{ marginLeft: '10px' }}
            onClick={onClickRemove}
          >
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CardItem
