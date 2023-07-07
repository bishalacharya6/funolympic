const express = require('express');
const router = express.Router();
const path = require('path');
const Image = require('../models/image');
const multer = require('multer');
const Game = require('../models/game');
const Schedule = require('../models/schedule');
const Player = require('../models/player');
const News = require('../models/news');
const Highlights = require('../models/highlights');
const User = require('../models/users');
const fs = require('fs');


router.use(express.urlencoded({ extended: true }));


//Using Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = Date.now();
        const fileName = `${uniqueSuffix}${fileExtension}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage })


//Uploading Image Route
router.post('/uploadimage', upload.single('imageFile'), async (req, res) => {

    // console.log(req.body);
    // console.log(req.file);

    const image = new Image({
        title: req.body.imageTitle,
        description: req.body.imageDescription,
        file: req.file.filename,
    });

    try {
        const savedImage = await image.save();
        // console.log('Image saved:', savedImage);

        res.status(200).json({ message: 'File uploaded and data saved successfully' });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).send('Internal server error');
    }
});



//Fetching image route
router.get('/getimages', async (req, res) => {
    try {
        // Fetch the image data from the database
        const images = await Image.find();

        // Create an array to store the image data with file paths
        const imagesWithFile = [];

        // Iterate through the images and append the file path to each image
        images.forEach((image) => {
            const imagePath = path.join('uploads', image.file);
            imagesWithFile.push({
                ...image.toObject(),
                filePath: imagePath,
            });
        });

        // Send the image data with file paths as a response
        res.json(imagesWithFile);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Internal server error');
    }
});


//Upload Game Route
router.post('/uploadgame', upload.single('gameImage'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const game = new Game({
        title: req.body.gameTitle,
        description: req.body.gameDescription,
        image: req.file.filename,
    });

    try {
        const savedGame = await game.save();
        console.log('Game saved:', savedGame);

        res.status(200).json({ message: 'Game uploaded and data saved successfully' });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Fetching the Game to the frontend
router.get('/getgames', async (req, res) => {
    try {
        // Fetch the game data from the database
        const games = await Game.find();

        // Create an array to store the game data with file paths
        const gamesWithFile = games.map((game) => {
            const gameImagePath = path.join('uploads', game.image);
            return {
                ...game.toObject(),
                imagePath: gameImagePath,
            };
        });

        res.json(gamesWithFile);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Internal server error');
    }
});

//Getting games details 
router.get('/getgames/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const games = await Game.findById(id);
  
      if (!games) {
        return res.status(404).json({ error: 'Game not found' });
      }
  
      const gamesImageData = path.join('uploads', games.image);
      const gamesWithImageData = {
        ...games.toObject(),
        image: gamesImageData,
      };
  
      res.status(200).json(gamesWithImageData);
    } catch (error) {
      console.error('Error fetching games details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

//Uploading Game Schedule
router.post('/uploadschedule', async (req, res) => {
    try {
        const { sport, date, time, location, teamA, teamB } = req.body;

        console.log(req.body);

        // Create a new game schedule
        const schedule = new Schedule({
            sport,
            date,
            time,
            location,
            teamA,
            teamB
        });

        // Save the game schedule to the database
        const savedSchedule = await schedule.save();

        res.status(200).json({ message: 'Game schedule uploaded successfully', schedule: savedSchedule });
    } catch (error) {
        console.error('Error uploading game schedule:', error);
        res.status(500).json({ message: 'Error uploading game schedule', error: error.message });
    }
});


// Fetching game schedule route
router.get('/getschedule', async (req, res) => {
    try {
        // Fetch the game schedule data from the database
        const schedule = await Schedule.find();

        // Send the game schedule data as a response
        res.json(schedule);
    } catch (error) {
        console.error({ message: 'Error fetching game schedule:', error });
        res.status(500).send('Internal server error');
    }
});


//Uploading Player Data
router.post('/player', upload.single('playerImage'), async (req, res) => {
    try {
        const player = new Player({
            image: req.file.filename,
            name: req.body.name,
            sports: req.body.sports,
            olympicMedals: req.body.olympicMedals,
            team: req.body.team,
            gameParticipants: req.body.gameParticipants,
            firstOlympicGames: req.body.firstOlympicGames,
            yearOfBirth: req.body.yearOfBirth,
            bio: req.body.bio
        });

        // Save the game data to the database
        const savedPlayer = await player.save();

        res.status(200).json({ message: 'Player data uploaded successfully', player: savedPlayer });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Fetch all player data
router.get('/getplayers', async (req, res) => {
    try {
        // Fetch all player data from the database
        const players = await Player.find();

        // Create an array to store the player data
        const playersWithImageData = players.map((player) => {
            const playerImageData = path.join('uploads', player.image);
            return {
                ...player.toObject(),
                image: playerImageData,
            };
        });

        res.status(200).json(playersWithImageData);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Fetching Data of Individual Player
router.get('/getplayers/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the player data with the given id from the database
        const player = await Player.findById(id);

        // Check if the player exists
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        // Add the image path to the player data
        const playerImageData = path.join('uploads', player.image);
        const playerWithImageData = {
            ...player.toObject(),
            image: playerImageData,
        };

        res.status(200).json(playerWithImageData);
    } catch (error) {
        console.error('Error fetching player details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Uploading News
router.post('/news', upload.single('newsImage'), async (req, res) => {
    try {
        const news = new News({
            image: req.file.filename,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
        });

        console.log(news)

        // Save the game data to the database
        const savedNews = await news.save();

        res.status(200).json({ message: 'Player data uploaded successfully', news: savedNews });
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Fetching News
router.get('/getnews', async (req, res) => {
    try {
        // Fetch all player data from the database
        const news = await News.find();

        // Create an array to store the player data
        const newsWithImageData = news.map((news) => {
            const newsImageData = path.join('uploads', news.image);
            return {
                ...news.toObject(),
                image: newsImageData,
            };
        });

        res.status(200).json(newsWithImageData);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Fetching Individual News
router.get('/getnews/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the news data with the given id from the database
        const news = await News.findById(id);

        // Check if the news exists
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        // Add the image path to the news data
        const newsImageData = path.join('uploads', news.image);
        const newsWithImageData = {
            ...news.toObject(),
            image: newsImageData,
        };

        res.status(200).json(newsWithImageData);
    } catch (error) {
        console.error('Error fetching news details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Uploading Highlights
router.post('/highlights', upload.single('highlightVideo'), async (req, res) => {
    try {
        const highlight = new Highlights({
            video: req.file.filename,
            title: req.body.title

        });

        console.log(highlight)

        // Save the game data to the database
        const savedHighlight = await highlight.save();

        res.status(200).json({ message: 'Highlight uploaded successfully', highlight: savedHighlight });
    } catch (error) {
        console.error('Error saving Highlight:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Fetching Highlights Videos 
router.get('/gethighlights', async (req, res) => {
    try {
        // Fetch all player data from the database
        const highlights = await Highlights.find();

        // Create an array to store the player data
        const highlightsWithVideoData = highlights.map((highlights) => {
            const highlightsVideoData = path.join('uploads', highlights.video);
            return {
                ...highlights.toObject(),
                video: highlightsVideoData,
            };
        });

        res.status(200).json(highlightsWithVideoData);
    } catch (error) {
        console.error('Error fetching Highlights Video:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Getting User Data
// Define a route to fetch user data for the admin panel
router.get('/getusers', async (req, res) => {
    try {
        // Fetch all user data from the database
        const users = await User.find({}, 'name username email blocked emailVerified');

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Block User
router.put('/getusers/block/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        // Find the user by ID
        const user = await User.findById(id);

        console.log(user);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Block the user
        user.blocked = true;
        await user.save();

        console.log(user)

        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error('Error blocking user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Unblock User
router.put('/getusers/unblock/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        // Find the user by ID
        const user = await User.findById(id);

        console.log(user);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Block the user
        user.blocked = false;
        await user.save();

        console.log(user)

        res.status(200).json({ message: 'User Unblock successfully' });
    } catch (error) {
        console.error('Error unblocking user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Delete User
router.delete('/getusers/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        // Find the user by ID
        const user = await User.findById(id);

        console.log(user);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Block the user
        await user.deleteOne();


        console.log(user)

        res.status(200).json({ message: 'User Deleted successfully' });
    } catch (error) {
        console.error('Error Deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Counting User
router.get('/countusers', async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error retrieving user count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Fetching Blocked Users
router.get('/blocked', async (req, res) => {
    try {
        const blockedUsers = await User.find({ blocked: true });
        res.status(200).json({ blockedUsers });
    } catch (error) {
        console.error('Error retrieving blocked users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Counting Uploads
router.get('/uploads/count', async (req, res) => {
    try {
        // Read the uploads directory and count the number of files
        const directoryPath = path.join(__dirname, '../uploads');
        const files = await fs.promises.readdir(directoryPath);
        const count = files.length;
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error retrieving upload count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;