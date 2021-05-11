import Tabs from "./Tabs";
import {useState} from "react";
import Typography from "./Typography";
import Transactions from "./Transactions";

const RecentActivityTabs = () => {
    const tabs = [{
        label: 'Transactions',
        content: (
            <Transactions/>
        )
    }, {
        label: 'DeBots',
        content: (
            <Typography>
                DeBots
            </Typography>
        )
    }]

    const [activeTab, setActiveTab] = useState(0);


    return (
        <div>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={(tab) => {
                setActiveTab(tab)
            }}/>
            {tabs[activeTab].content}
        </div>
    )
};

export default RecentActivityTabs;
