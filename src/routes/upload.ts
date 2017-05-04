import {Router, Request, Response} from 'express';
import * as passport from 'passport';
import * as multer from 'multer';
import * as path from 'path';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/'));
    },
    filename: (req, file, cb) => {
        let date = Date.now();
        console.log(file);
        cb(null, file.fieldname + '-' + date + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

let upload = multer({
    storage: storage
});

let router = Router();

router.post('/upload', passport.authenticate('jwt', {session: false}), upload.any(), (req: Request, res: Response) => {
    res.json({fileName: req.files[0].filename});
});

export = router;
