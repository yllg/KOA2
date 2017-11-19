//注册路由
import index from './indexController'
const controllerInit = {
    init(app,router){
        app.use(router(_ => {
            //使用indexController里面的index方法
            _.get('/',(ctx,next) =>{
                ctx.redirect('/index/index');
            }),
            _.get('/index/index',index.index()),
            _.get('/index/update',index.update())
        }))
    }
}

export default controllerInit