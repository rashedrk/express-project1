import express, { NextFunction, Request, Response } from 'express';
const app = express();

//parsers
app.use(express.json());
app.use(express.text());

//middlewares
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method, req.hostname);
    next();
}

// routers
const userRouter = express.Router();
const courseRouter = express.Router();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/course', courseRouter);

userRouter.post('/create-user', (req: Request, res: Response) => {
    const user = req.body;
    res.json({
        success: true,
        message: 'User created successfully',
        data: user
    })
})


courseRouter.post('/create-course', (req: Request, res: Response) => {
    const course = req.body;
    res.json({
        success: true,
        message: 'Course created successfully',
        data: course
    })
});


app.get('/', logger, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        // res.send(something) // error 
    } catch (error) {
        next(error)

        // console.log(error);
        // res.status(400).json({
        //     success: false,
        //     message: 'Error getting data'
        // })
    }
})
app.post('/', logger, (req: Request, res: Response) => {
    console.log(req.body);

    res.send('Hello Worlds!')
})

app.use("*", (req: Request, res: Response) => {
    res.status(400).json({
        success: false,
        message: 'Route not found'
    });
})

//global error handler
app.use((error: any, req:Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        message: 'Something went wrong'
    })
    next()
})

export default app;