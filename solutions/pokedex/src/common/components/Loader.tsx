import { Container } from "react-bootstrap"

export const Loader = ({ loading, children }: { loading: boolean, children?: JSX.Element } = { loading: true }) => {

  return (
    <>
      {loading ?
        <Container style={{ display: 'flex', position: 'fixed', top: '50%', bottom: '50%', justifyContent: 'center' }}>
          <div className='pokeball' /><div style={{ position: 'absolute', paddingTop: 75, paddingLeft: 160 }}>Loading...</div>
        </Container>
        : <>{children}</>
      }
    </>
  )
}