 // server/middleware/multer.js
import multer from "multer";

const upload = multer({ storage: multer.diskStorage({}) });

export default upload;
