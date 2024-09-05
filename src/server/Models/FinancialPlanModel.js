const financialPlanModel = (sequelize, DataTypes)=>{
    const financialPlan= sequelize.define('FinancialPlan',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        goals:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            allowNull:false,
        },
        startDate:{
            type:DataTypes.DATE,
            allowNull:false,
        }, 
        endDate:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        targetAmount:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },{timestamps:true})
    return financialPlan;
}

export default financialPlanModel;