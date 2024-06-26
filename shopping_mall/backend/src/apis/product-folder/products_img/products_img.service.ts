import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product_img } from './entities/product_img.entity';
import { Repository } from 'typeorm';
import { FilesService } from 'src/apis/files/files.service';

@Injectable()
export class ProductImgsService {
  constructor(
    @InjectRepository(Product_img)
    private readonly productImgsRepository: Repository<Product_img>,
    private readonly filesService: FilesService,
  ) {}

  async create({ product_img }): Promise<Product_img[]> {
    const imageUrls = await this.filesService.uploadFiles(product_img);

    const savedProductImgs = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const img = new Product_img();
      img.image_url = imageUrls[i];
      img.is_main = i === 0;

      const savedImg = await this.productImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }

    return savedProductImgs;
  }
  async update(product_no, product_img): Promise<Product_img[]> {
    await this.delete({ product_no });

    const imageUrls = await this.filesService.uploadFiles(product_img);

    const savedProductImgs = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const img = new Product_img();
      img.image_url = imageUrls[i];
      img.is_main = i === 0;
      img.product_no = product_no;

      const savedImg = await this.productImgsRepository.save(img);
      savedProductImgs.push(savedImg);
    }

    return savedProductImgs;
  }

  async delete(product_no): Promise<void> {
    const imagesToDelete = await this.productImgsRepository.find({ where: product_no });

    for (const image of imagesToDelete) {
      await this.filesService.deleteImages([image.image_url]);
      const result = await this.productImgsRepository.delete(image);
      console.log(result);
    }
  }
}
