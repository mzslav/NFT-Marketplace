export const blockchainData = [
    {
      userAddress: "0xUser1", // Адрес користувача
      username: "mzslav", // Логін користувача
      totalBalance: 0.052, // Баланс користувача
      purchases: 2, // Кількість покупок
      sales: 0, // Кількість продажів
      totalNFTs: 2, // Загальна кількість NFT
      nfts: [ // Масив NFT, якими володіє користувач
        {
          id: 444,
          title: "Monkey-Trip1",
          releaseDate: "01/11/2024",
          price: "0.012 ETH",
          imageUrl: "https://cdn.prod.website-files.com/6615636a03a6003b067c36dd/661ffd0dbe9673d914edca2d_6423fc9ca8b5e94da1681a70_Screenshot%25202023-03-29%2520at%252010.53.43.jpeg",
          description: "A unique artwork representing a journey through the jungle.",
          isAuction: false,
          collectionName: "Jungle Adventures",
        },
        {
          id: 1,
          title: "Sunset Art1",
          releaseDate: "10/11/2024",
          price: "0.04 ETH",
          imageUrl: "https://pikuco.ru/upload/test_stable/fa5/fa5d72ebf73a583f7a7f52e3efa5a452.webp",
          description: "A beautiful sunset captured at the perfect moment.",
          isAuction: true,
          auctionStart: "11/11/2024",
          auctionEnd: "20/11/2024",
          nftStatus: "on auction",
          collectionName: "Jungle Adventures",
        },
      ],
    },
    {
      userAddress: "0xUser2",
      username: "artist123",
      totalBalance: "1.234 ETH",
      purchases: 1,
      sales: 1,
      totalNFTs: 2,
      nfts: [
        {
          id: 2,
          title: "Ocean Breeze",
          releaseDate: "05/12/2024",
          price: "0.03 ETH",
          imageUrl: "https://i.pinimg.com/736x/c3/46/10/c3461077fc8bb8613abf7ea956bc4708.jpg",
          description: "A peaceful ocean view with a calming breeze.",
          isAuction: true,
          auctionStart: "06/12/2024",
          auctionEnd: "15/12/2024",
          nftStatus: "on auction",
          collectionName: "Ocean Views",
        },
      ],
    },
  ];
  