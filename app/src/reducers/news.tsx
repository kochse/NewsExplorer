const initialState = [
    { title: 'test1', href: 'test1' },
    { title: 'test1', href: 'test1' },
    { title: 'test1', href: 'test1' },
    { title: 'test1', href: 'test1' },
    { title: 'test1', href: 'test1' }
]

export default function news(state = initialState, action: any) {
    switch (action.type) {
      case 'UPDATE':
        return []
      default:
        return state
    }
}