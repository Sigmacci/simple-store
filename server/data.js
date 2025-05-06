import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const Beer = sequelize.define('Beer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'beer',
    timestamps: false
});

async function initializeDatabase() {
    try {
        await Beer.sync({ force: true });
        console.log('Beer table created successfully!');

        await Beer.bulkCreate([
            { name: 'Heineken', img: 'https://example.com/heineken.jpg', price: 2.50, stock: 100 },
            { name: 'Tesco', img: 'https://example.com/budweiser.jpg', price: 2.00, stock: 50 },
            { name: 'Zywiec Mocne', img: 'https://example.com/corona.jpg', price: 2.75, stock: 75 },
            { name: 'Harnas', img: 'https://example.com/guinness.jpg', price: 3.00, stock: 30 },
            { name: 'Warka', img: 'https://example.com/stella.jpg', price: 2.25, stock: 60 }
        ]);
        console.log('Beer entries created successfully!');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

export { Beer, initializeDatabase };