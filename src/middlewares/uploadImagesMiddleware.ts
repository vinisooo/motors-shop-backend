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
        let imagesFile: string[] = []
        if(files["galleryAdvertisement[]"]){
            const galleryAdvertisement = files["galleryAdvertisement[]"];
            
            for(const img of galleryAdvertisement) {
                await cloudinary.uploader.upload(img.path, async(err: unknown, result: {url: string}) => {
                    if(err){
                        console.log(err)
                        throw new AppError("Internal Server Error", 500)
                    }

                    imagesFile.push(result.url)
                })
            }
        }
        if(req.body.galleryAdvertisement){
            let imagesLinkFile = [...req.body.galleryAdvertisement, ...imagesFile]
            req.body.galleryAdvertisement = imagesLinkFile.map((img: string) => {
                return {
                    imageUrl: img
                }
            })
        }else{
            req.body.galleryAdvertisement = imagesFile.map((img) => {
                return {
                    imageUrl: img
                }
            })
        }
    }

    req.body.isAvailable = req.body.isAvailable === "false" ?  false : true
    req.body.fipeDeal = req.body.fipeDeal === "false" ?  false : true
    req.body.price = Number(req.body.price) ? Number(req.body.price) : req.body.price;
    req.body.year = Number(req.body.year) ? Number(req.body.year) : req.body.year;
    req.body.quilometers = Number(req.body.quilometers) ? Number(req.body.quilometers) : req.body.quilometers;

    return next()
}

export {uploadAdvertImagesMiddleware}