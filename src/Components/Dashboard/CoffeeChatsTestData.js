import ChatTypes from './ChatTypes';

const CoffeeChatsTestData = [
  {
    "type": ChatTypes.oneOnOne,
    "booked": false,
    "name": "Mohaimen K",
    "title": "Software Engineer",
    "company": "Microsoft",
    "tags": ["Software", "Programming", "Product"],
    "available": "July 1th, 2020"
  },
  {
    "type": ChatTypes.oneOnOne,
    "booked": false,
    "name": "Ahmed H",
    "title": "Software Engineer",
    "company": "Tealbook",
    "tags": ["Software", "Frontend", "Programming"],
    "available": "August 10th, 2020"
  },
  {
    "type": ChatTypes.fourOnOne,
    "booked": false,
    "name": "Malak A",
    "title": "Software Engineer",
    "company": "MAX",
    "tags": ["Software", "Programming"],
    "available": "August 5th, 2021"
  },
  {
    "type": ChatTypes.oneOnOne,
    "booked": true,
    "name": "Fatum A",
    "title": "Software Engineer",
    "company": "MAX",
    "tags": ["Software", "Frontend"],
    "available": "May 15th, 2021"
  }
]

export default CoffeeChatsTestData
