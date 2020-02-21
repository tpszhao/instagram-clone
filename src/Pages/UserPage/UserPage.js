import React from 'react'
import styles from './UserPage.module.css'

const sampleurl = "https://instagram.fyvr3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/21690781_275471236290359_6737907301979521024_n.jpg?_nc_ht=instagram.fyvr3-1.fna.fbcdn.net&_nc_ohc=5O7kvK8FLtgAX-n9YAs&oh=5b99af793de86a5472fd0e2709bd6d16&oe=5E8985C2"
const imageurl="https://instagram.fyvr3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/87427565_1433034430212200_4560025116861897638_n.jpg?_nc_ht=instagram.fyvr3-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=lSdrjPFzJL4AX-hhQux&oh=060f4854f46681faa1c702006301893b&oe=5E7A862B"
export default function UserPage(props) {
    let list = [];
    for(let i =0;i<20;i++){
        list=[...list,imageurl]
    }
    return (
        <div className={styles.container}>
            <div className={styles.userheader}>
                <img className={styles.profile_image} src={sampleurl} alt="avatar"/>
                <span className={styles.username}>UserName</span>
                <div className={styles.userstat}>
                    <span>Total Likes</span>
                    <span>Total Photos</span>
                    <span>Total Followers</span>
                </div>
            </div>
            <div className={styles.photos}>
                {list.map((image,i)=>{
                    return <img 
                            key={i} 
                            src={image} 
                            alt="placeholder" 
                            className={styles.samplephoto}/>
                })}

            </div>

        </div>
    )
}
