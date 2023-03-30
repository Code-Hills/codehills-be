import * as fs from "fs";
import { join, extname } from "path";

/**
 * Confirm user account
 * @param {string} type file type
 * @param {object} file file
 */

// eslint-disable-next-line consistent-return
export const fileUploader = (file, query = "media") => {
  try {
    const dir = join(process.env.ROOT_DIR || process.cwd(), `/assets/uploads`);
    const ext = extname(file.name);
    const itemName = `${query}-${Math.round(Math.random() * 1e9)}${ext}`;
    let filepath = `${dir}/${itemName}`;
    let itemLocation = `${process.env.HOST}/uploads/${itemName}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    file.mv(`${filepath}`, (err) => {
      if (err) {
        itemLocation = null;
        filepath = null;
      }
    });
    return { itemLocation, filepath, fileName: itemName };
  } catch (error) {
    return null;
  }
};
