import { express, jwt,validationResult, connectDB, 
    registerValidation,NftValidation,UserModel,user,nft,NftModel,checkToken, 
    authenticateJWT} from './imports/index.js';

import * as UserController from './controllers/UserController.js'
import * as NftController from './controllers/NftController.js'

import cors from "cors";

connectDB();

const app = express();
const PORT = process.env.PORT || 3500;
app.use(cors());
app.use(express.json());

app.post('/create', checkToken,authenticateJWT, NftValidation,NftController.AddNewNft);

app.get('/marketplace',NftController.GetAllNFT);

app.get('/nft/:id',NftController.GetNftInfo);

app.post('/user/connect',UserController.connectUser);
app.post('/user/verify-token', UserController.verifyToken);


app.post('/nft/:id/buy',authenticateJWT,NftController.buyNft);

app.get('/users',UserController.getAllUsers);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
