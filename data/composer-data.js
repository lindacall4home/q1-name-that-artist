var artists = [
  {
    type: 'Composer',
    wikipage: 'Johann_Sebastian_Bach',
    shortName: 'Bach',
    birth: '1685',
    death: '1750',
    genre: ['Baroque'],
    location: ['Germany'],
    thumbnail: './images/260px-Johann_Sebastian_Bach.jpg',
    works: [
      {
        title: "Prelude & Fuge 3",
        file: 'Bach.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Ludwig_van_Beethoven',
    shortName: 'Beethoven',
    birth: '1770',
    death: '1827',
    genre: ['Classical', "Romantic"],
    location: ['Austria'],
    thumbnail: './images/Beethoven.jpg',
    works: [
      {
        title: "Sinfoni Number 5",
        file: 'Beethoven.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Johannes_Brahms',
    shortName: 'Brahms',
    birth: '1833',
    death: '1897',
    genre: ["Romantic"],
    location: ['Austria', 'Germany'],
    thumbnail: './images/170px-JohannesBrahms.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'William_Byrd',
    shortName: 'Byrd',
    birth: '1540',
    death: '1623',
    genre: ['Renaissance'],
    location: ['England'],
    thumbnail: './images/220px-William_Byrd.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Johann_Sebastian_Bach',
    shortName: 'Dufay',
    birth: '1770',
    death: '1827',
    genre: ['Classical', "Romantic"],
    location: ['Austria'],
    thumbnail: './images/260px-Johann_Sebastian_Bach.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Wolfgang_Amadeus_Mozart',
    shortName: 'Mozart',
    thumbnail: './images/Croce-Mozart-Detail.jpg',
    birth: '1756',
    death: '1791',
    genre: ['Classical'],
    location: ['Austria'],
    works: [
      {
        title: "Divertimento K131",
        file: 'Mozart.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Antonio_Vivaldi',
    shortName: 'Vivaldi',
    thumbnail: './images/Vivaldi.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Ludwig_van_Beethoven',
    shortName: 'Beethoven',
    thumbnail: './images/Beethoven.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Leonard_Bernstein',
    shortName: 'Bernstein',
    thumbnail: './images/Leonard_Bernstein_by_Jack_Mitchell.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Frédéric_Chopin',
    shortName: 'Chopin',
    thumbnail: './images/Frederic_Chopin_photo.jpeg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Wolfgang_Amadeus_Mozart',
    shortName: 'Mozart',
    thumbnail: './images/Croce-Mozart-Detail.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Antonio_Vivaldi',
    shortName: 'Vivaldi',
    thumbnail: './images/Vivaldi.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Johann_Sebastian_Bach',
    shortName: 'Bach',
    thumbnail: './images/260px-Johann_Sebastian_Bach.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Ludwig_van_Beethoven',
    shortName: 'Beethoven',
    thumbnail: './images/Beethoven.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Leonard_Bernstein',
    shortName: 'Bernstein',
    thumbnail: './images/Leonard_Bernstein_by_Jack_Mitchell.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Frédéric_Chopin',
    shortName: 'Chopin',
    thumbnail: './images/Frederic_Chopin_photo.jpeg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Wolfgang_Amadeus_Mozart',
    shortName: 'Mozart',
    thumbnail: './images/Croce-Mozart-Detail.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  },
  {
    type: 'Composer',
    wikipage: 'Antonio_Vivaldi',
    shortName: 'Vivaldi',
    thumbnail: './images/Vivaldi.jpg',
    works: [
      {
        title: "Toccata and Fugue in D minor",
        file: 'Bach_and_Joe_DeGeorge_-_05_-_Tocatta_in_D_Minor.mp3'}
    ]
  }
];
