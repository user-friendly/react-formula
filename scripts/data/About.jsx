"use strict"
/**
 * About view.
 * 
 * This is an test file for the newish custom router system.
 * 
 * %route=/about1
 * %title = About1;
 */


           /**
//	 %route = /about2
									//	 %route = /about3
									**#@^*(&#@)$^&* =%title=About2 sadfoi sdajklf jks    kdsajflkdsa   l k    =;=					
                    */

import Router from '#Router'

//	 %route==/about4=dsfdsfds
									//	 %route=|=/about5   ;  lksdjflkdsjfdksl

const About = () => {
	return ( 
		<div className="px-8 h-full flex flex-col justify-start items-start gap-y-6">
			<h1 className="self-center text-4xl">About</h1>
			<p> {/** %hard_to_spot_property = this is kinda sus!*/}
				As a highly skilled freelance software engineer with over a decade of
				experience, I specialize in designing and developing custom software
				solutions tailored to meet the unique needs of my clients. With
				expertise in multiple programming languages, frameworks, and a strong
				background in web development, I offer end-to-end services, from concept
				and planning to deployment and ongoing support. My passion for
				innovation and problem-solving drives me to deliver high-quality,
				efficient, and scalable solutions that help businesses grow and succeed
				in today's competitive landscape.{' '}
				<span className="font-noto text-2xl">🤖</span>
			</p>
			<p>
				Understanding my client's needs is of top priority and a great deal goes
				into the initial discovery of the application requirements. [Expand a
				bit?]
			</p>
			<p>
				I've worked within a medium sized team with two week Scrum sprint
				development, testing and {/*// %hide = 12345 */} release cycle,
				using Atlassin JIRA as the primary way to track tasks. [Yeah, what else?]
			</p>
			<p>
				Languages, frameworks, and other technologies? I got them all! From
				assembly to JavaScript to AI prompt "code" that will save Your company
				millions of <span className="font-noto text-2xl">💵💰💵💰</span>. You
				name it - I got it! Unless it's{' '// %hide_2=sus;}
				<span className="font-bold text-red-700">PHP</span>. I don't develop
				software using script-kiddy languages of the stone age.
			</p>
			<p className="self-end font-bold">User Friendly</p>
		</div>
	)
}

Router.setRoute('/about', <About />, 'About')

export default About
