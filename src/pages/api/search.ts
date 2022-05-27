import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import coverDefault from "../../assets/images/cover-default.png";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?maxResults=10&q=${q}`
  );

  const itens = response.data.items.map((item: any) => {
    return {
      id: item.id,
      title: item.volumeInfo.title,
      subtitle: item.volumeInfo.subtitle,
      authors: item.volumeInfo.authors,
      image: item.volumeInfo.imageLinks?.thumbnail || coverDefault.src,
      pageCount: item.volumeInfo.pageCount,
    };
  });

  res.status(200).json(itens);
};

export default handler;
