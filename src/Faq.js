import React, { Component } from "react";
import Accordion from "./Accordion";

class Faq extends Component {
    render() {
        return (
            <div>
                <h1>Frequently Asked Questions</h1>
                <Accordion title='What is this website?' description="It's a simple imageboard frontend written in React." />
                <Accordion title='How are the images stored?' description="The images are stored in an IndexedDB called 'imageboard_db' in the 'files' store. "/>
                <Accordion title="Can I leave comments under the images?" description="Certainly! In order to add a comment to an image, click on the image on the Main Page, which should redirect you to the '/comments/:imageId' page. There you can leave a comment and view previous comments."/>
                <Accordion title="What assisted you with creating this website?" description="I've used sample code from mozilla.org, stackoverflow.com, lab homeworks and a lot of other resources."/>
            </div>
        );
    }
   };

   export default Faq;