import jwt from 'jsonwebtoken';

export default(req,res,next) => {
    
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decoded = jwt.verify(token, 'zhyhul');
        
            req.userId = decoded.id;        
            next();
        } 
        
        catch (error) {
            return res.status(403).json({
                message: 'can`t get id',
            });
        }

    }
    else {
       return res.status(403).json({
            message: 'Token enspired',
        });
    }




}