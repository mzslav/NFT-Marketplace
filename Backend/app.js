import { express, jwt,validationResult, connectDB, 
    registerValidation,NftValidation,UserModel,user,nft,NftModel,checkToken } from './imports/index.js';

import {connectUser} from './controllers/UserController.js'
import * as NftController from './controllers/NftController.js'


connectDB();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.post('/nft/add', checkToken, NftValidation,NftController.AddNewNft);

app.get('/nft',NftController.GetNftInfo);

app.post('/profile/connect',connectUser);





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
