import app from './app'
import { Server } from 'http'

const port = 5000;

let server: Server;

async function bootstrap() {
    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

bootstrap();