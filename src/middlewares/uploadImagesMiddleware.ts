import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
const cloudinary = require("../utils/cloudinary");

const uploadAdvertImagesMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const files: any = req.files;

    if(files){
        if(files.coverImage){
            const coverImage = files.coverImage;
            await cloudinary.uploader.upload(coverImage[0].path, async(err: unknown, result:{url: string})=>{
                if(err){
                    console.log(err)
                    throw new AppError("Internal Server Error", 500)
                }
                req.body.coverImage = result.url;
            });
        }
        if(files["galleryAdvertisement[]"]){
            console.log(files)
            const galleryAdvertisement = files["galleryAdvertisement[]"];
            let imageUrls: string[] = []
            for(const img of galleryAdvertisement) {
                await cloudinary.uploader.upload(img.path, async(err: unknown, result: {url: string}) => {
                    console.log(img)
                    if(err){
                        console.log(err)
                        throw new AppError("Internal Server Error", 500)
                    }

                    imageUrls.push(result.url)
                })
            }
            req.body.galleryAdvertisement = imageUrls.map((img) => {
                return {
                    imageUrl: img
                }
            })
        }
    }
    console.log(req.body)

    req.body.fipeDeal = req.body.fipeDeal === "false" ?  false : true
    req.body.price = Number(req.body.price) ? Number(req.body.price) : req.body.price;
    req.body.year = Number(req.body.year) ? Number(req.body.year) : req.body.year;
    req.body.quilometers = Number(req.body.quilometers) ? Number(req.body.quilometers) : req.body.quilometers;

    return next()
}

export {uploadAdvertImagesMiddleware}