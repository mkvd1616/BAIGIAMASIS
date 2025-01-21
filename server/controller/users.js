import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import users from '../models/users.js';

const router = Router();

router.get('/users', auth, async (req, res) => {
    try {
        const allUsers = await users.find();
     
        allUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
        res.json(allUsers);
    } catch {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password)
            return res.status(400).json('Negauti prisijungimo duomenys');

        const user = await users.findOne({ email: req.body.email });
        
        if (!user || !(await user.comparePassword(req.body.password)))
            return res.status(401).json('Neteisingi prisijungimo duomenys');
        
        req.session.user = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };

        res.json(req.session.user);
    } catch (error) {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = await users.create(req.body);
        res.json('Vartotojas sėkmingai užregistruotas');
    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                return res.status(400).json('El. pašto adresas jau užregistruotas');
            }
            if (error.keyPattern.personalCode) {
                return res.status(400).json('Asmens kodas jau užregistruotas');
            }
        }
        
        if (error.errors?.personalCode) {
            return res.status(400).json(error.errors.personalCode.message);
        }
        
        res.status(500).json(error.message || 'Įvyko serverio klaida');
    }
});


router.post('/accounts', auth, async (req, res) => {
    try {
        const user = await users.findById(req.session.user.id);
        user.accounts.push({}); 
        await user.save();
        res.json('Sąskaita sėkmingai sukurta');
    } catch (error) {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/accounts', auth, async (req, res) => {
    try {
        const user = await users.findById(req.session.user.id);
        res.json(user.accounts);
    } catch (error) {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/accounts/:id', auth, async (req, res) => {
    try {
        const user = await users.findById(req.session.user.id);
        const account = user.accounts.id(req.params.id);
        
        if (!account) {
            return res.status(404).json('Sąskaita nerasta');
        }
        
        res.json(account);
    } catch (error) {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.delete('/accounts/:id', auth, async (req, res) => {
    try {
        const user = await users.findById(req.session.user.id);
        const account = user.accounts.id(req.params.id);
        
        if (!account)
            return res.status(404).json('Sąskaita nerasta');
            
        if (account.balance > 0)
            return res.status(400).json('Negalima ištrinti sąskaitos su teigiamu balansu');
            
        account.deleteOne();
        await user.save();
        
        res.json('Sąskaita sėkmingai ištrinta');
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.post('/accounts/:id/deposit', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0)
            return res.status(400).json('Neteisinga suma');
            
        const user = await users.findById(req.session.user.id);
        const account = user.accounts.id(req.params.id);
        
        if (!account)
            return res.status(404).json('Sąskaita nerasta');
            
        account.balance += amount;
        await user.save();
        
        res.json('Lėšos sėkmingai įneštos');
    } catch (error) {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.post('/accounts/:id/withdraw', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0)
            return res.status(400).json('Neteisinga suma');
            
        const user = await users.findById(req.session.user.id);
        const account = user.accounts.id(req.params.id);
        
        if (!account)
            return res.status(404).json('Sąskaita nerasta');
            
        if (account.balance < amount)
            return res.status(400).json('Nepakankamas sąskaitos likutis');
            
        account.balance -= amount;
        await user.save();
        
        res.json('Lėšos sėkmingai nurašytos');
    } catch (error) {
        res.status(500).json('Įvyko serverio klaida');
    }
});

router.get('/check-auth', auth, (req, res) => {
    res.json(req.session.user);
});

router.get('/logout', auth, (req, res) => {
    req.session.destroy();
    res.json("Sėkmingai atsijungėte");
});

export default router;