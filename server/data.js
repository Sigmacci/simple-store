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
            { name: 'Heineken', img: 'https://png.pngtree.com/png-clipart/20220930/original/pngtree-beer-mug-illustration-png-image_8646552.png', price: 2.50 },
            { name: 'Tesco', img: 'https://png.pngtree.com/png-clipart/20220930/original/pngtree-beer-mug-illustration-png-image_8646552.png', price: 2.00 },
            { name: 'Zywiec Mocne', img: 'https://png.pngtree.com/png-clipart/20220930/original/pngtree-beer-mug-illustration-png-image_8646552.png', price: 2.75 },
            { name: 'Harnas', img: 'https://png.pngtree.com/png-clipart/20220930/original/pngtree-beer-mug-illustration-png-image_8646552.png', price: 3.00 },
            { name: 'Warka', img: 'https://png.pngtree.com/png-clipart/20220930/original/pngtree-beer-mug-illustration-png-image_8646552.png', price: 2.25 }
        ]);
        console.log('Beer entries created successfully!');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

export { Beer, initializeDatabase };