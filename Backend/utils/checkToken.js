import jwt from 'jsonwebtoken';

export default(req,res,next) => {
    
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decoded = jwt.verify(token, 'zhyhul');
        
            req.metaMaskAddress = decoded.metaMaskAddress;
            next();
        } 
        
        catch (error) {
            return res.status(403).json({
                message: 'token enspireddddd',
            });
        }

    }
    else {
       return res.status(403).json({
            message: 'Token enspired',
        });
    }




}