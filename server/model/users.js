import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';


const generateIBAN = () => {
    const bankCode = '10100'; 
    const accountNumber = Math.random().toString().slice(2, 12); 
    const unformattedIBAN = `LT00${bankCode}${accountNumber}`;
    
   
    const ibanDigits = unformattedIBAN.split('').map(char => {
        if (/[A-Z]/.test(char)) {
            return (char.charCodeAt(0) - 55).toString();
        }
        return char;
    }).join('');
    
   
    const remainder = BigInt(ibanDigits) % 97n;
    const checkDigits = (98 - Number(remainder)).toString().padStart(2, '0');
    
    return `LT${checkDigits}${bankCode}${accountNumber}`;
};

const validatePersonalCode = (code) => {
    if (!/^\d{11}$/.test(code)) return false;
    
    const gender = parseInt(code[0]);
    if (![1, 2, 3, 4, 5, 6].includes(gender)) return false;
    
    const year = parseInt(code.slice(1, 3));
    const month = parseInt(code.slice(3, 5));
    const day = parseInt(code.slice(5, 7));
    
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    
    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(code[i]) * weights[i];
    }
    const remainder = sum % 11;
    const controlNumber = remainder !== 10 ? remainder : 0;
    
    return controlNumber === parseInt(code[10]);
};

const AccountSchema = new Schema({
    iban: {
        type: String,
        required: true,
        unique: true,
        default: generateIBAN
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    personalCode: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validatePersonalCode,
            message: 'Invalid Lithuanian personal code'
        }
    },
    accounts: [AccountSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


UserSchema.pre('save', function(next) {
    const accountsToDelete = this.accounts.filter(account => 
        account._id && !this.accounts.id(account._id) && account.balance > 0
    );
    
    if (accountsToDelete.length > 0) {
        next(new Error('Cannot delete account with positive balance'));
    }
    
    if (this.accounts.some(account => account.balance < 0)) {
        next(new Error('Balance cannot be negative'));
    }
    
    next();
});


UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default model('User', UserSchema);