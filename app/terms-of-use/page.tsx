import { Footer } from "../components/Basic/Footer";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return {
    title: `Terms of Use - Sonic Odyssey`,
  };
}

export default function TermsOfUse() {
  return (
    <>
      <div className="flex flex-col gap-4 doc-content max-w-6xl mx-auto my-20 px-10 text-white font-serif">
        <p className="text-center text-2xl py-10">
          <strong>Sonic.game Terms of Use</strong>
        </p>
        <p>Last Modified: June 5, 2024</p>
        <p>
          <span className="underline">
            <strong>Acceptance of the Terms of Use</strong>
          </span>
        </p>
        <p>
          These terms of use are entered into by and between You and Mirror
          World Inc. &nbsp;("<strong>Company</strong>," "<strong>we</strong>,"
          or "<strong>us</strong>"). The following terms and conditions,
          together with any documents and addendums they expressly incorporate
          herein or by reference (collectively, "<strong>Terms of Use</strong>
          "), govern your access to and use of www.sonic.game, including any
          content, functionality and services offered on or through
          www.sonic.game (the "<strong>Website</strong>"), whether as a guest or
          a registered user.
        </p>
        <p>
          Please read the Terms of Use carefully before you start to use the
          Website.&nbsp;
          <strong>
            By using the Website, you accept and agree to be bound and abide by
            these Terms of Use and our Privacy Policy, found at&nbsp;
          </strong>
          <span className="text-[rgb(0, 0, 255)] underline">
            <a target="_blank" href="https://mirrorworld.fun/privacy-policy">
              https://mirrorworld.fun/privacy-policy
            </a>
          </span>
          <strong>, incorporated herein by reference.</strong>&nbsp;If you do
          not want to agree to these Terms of Use or the Privacy Policy, you
          must not access or use the Website.
        </p>
        <p>
          This Website is offered and available to users who are 18 years of age
          or older. By using this Website, you represent and warrant that you
          are of legal age to form a binding contract with the Company and meet
          all of the foregoing eligibility requirements. If you do not meet all
          of these requirements, you must not access or use the Website.
        </p>
        <p>
          <span className="underline">
            <strong>Changes to the Terms of Use</strong>
          </span>
        </p>
        <p>
          We may revise and update these Terms of Use from time to time in our
          sole discretion. All changes are effective immediately when we post
          them, and apply to all access to and use of the Website thereafter.
        </p>
        <p>
          Your continued use of the Website following the posting of revised
          Terms of Use means that you accept and agree to the changes. You are
          expected to check this page each time you access this Website so you
          are aware of any changes, as they are binding on you.
        </p>
        <p>
          <span className="underline">
            <strong>Accessing the Website and Account Security</strong>
          </span>
        </p>
        <p>
          We reserve the right to withdraw or amend this Website, and any
          service or material we provide on the Website, in our sole discretion
          without notice. We will not be liable if for any reason all or any
          part of the Website is unavailable at any time or for any period. From
          time to time, we may restrict access to some parts of the Website, or
          the entire Website, to users, including registered users.
        </p>
        <p>You are responsible for both:</p>
        <ul>
          <li>
            Making all arrangements necessary for you to have access to the
            Website.
          </li>
          <li>
            Ensuring that all persons who access the Website through your
            internet connection are aware of these Terms of Use and comply with
            them.
          </li>
        </ul>
        <p>
          To access the Website or some of the resources it offers, you may be
          asked to provide certain registration details or other information. It
          is a condition of your use of the Website that all the information you
          provide on the Website is correct, current and complete. You agree
          that all information you provide to register with this Website or
          otherwise, including, but not limited to, through the use of any
          interactive features on the Website, is governed by our&nbsp;
          <span className="text-[rgb(0, 0, 255)] underline">
            <a target="_blank" href="https://mirrorworld.fun/privacy-policy">
              Privacy Policy
            </a>
          </span>
          , and you consent to all actions we take with respect to your
          information consistent with our Privacy Policy.
        </p>
        <p>
          If you choose, or are provided with, a user name, password or any
          other piece of information as part of our security procedures, you
          must treat such information as confidential, and you must not disclose
          it to any other person or entity. You also acknowledge that your
          account is personal to you and agree not to provide any other person
          with access to this Website or portions of it using your user name,
          password or other security information. You agree to notify us
          immediately of any unauthorized access to or use of your user name or
          password or any other breach of security. You also agree to ensure
          that you exit from your account at the end of each session. You should
          use particular caution when accessing your account from a public or
          shared computer so that others are not able to view or record your
          password or other personal information.
        </p>
        <p>
          We have the right to disable any user name, password or other
          identifier, whether chosen by you or provided by us, at any time in
          our sole discretion for any or no reason, including if, in our
          opinion, you have violated any provision of these Terms of Use.
        </p>
        <p>
          <span className="underline">
            <strong>Intellectual Property Rights</strong>
          </span>
        </p>
        <p>
          The Website and its entire contents, features and functionality
          (including but not limited to all information, software, text,
          displays, images, video and audio, and the design, selection and
          arrangement thereof), are owned by the Company, its licensors or other
          providers of such material and are protected by local and
          international copyright, trademark, patent, trade secret and other
          intellectual property or proprietary rights laws.
        </p>
        <p>
          These Terms of Use permit you to use the Website for your personal,
          non-commercial use only. You must not reproduce, distribute, modify,
          create derivative works of, publicly display, publicly perform,
          republish, download, store or transmit any of the material on our
          Website, except as follows:
        </p>
        <ul>
          <li>
            Your computer may temporarily store copies of such materials in RAM
            incidental to your accessing and viewing those materials.
          </li>
          <li>
            You may store files that are automatically cached by your Web
            browser for display enhancement purposes.
          </li>
          <li>
            You may print one copy of a reasonable number of pages of the
            Website for your own personal, non-commercial use and not for
            further reproduction, publication or distribution.
          </li>
          <li>
            If we provide desktop, mobile or other applications for download,
            you may download a single copy to your computer or mobile device
            solely for your own personal, non-commercial use, provided you agree
            to be bound by our end user license agreement for such applications.
          </li>
        </ul>
        <p>You must not:</p>
        <ul>
          <li>Modify copies of any materials from this site.</li>
          <li>
            Delete or alter any copyright, trademark or other proprietary rights
            notices from copies of materials from this site.
          </li>
        </ul>
        <p>
          You must not access or use for any commercial purposes any part of the
          Website or any services or materials available through the Website.
        </p>
        <p>
          If you wish to make any use of material on the Website other than that
          set out in this section, please address your request to:
          support@sonic.game.
        </p>
        <p>
          If you print, copy, modify, download or otherwise use or provide any
          other person with access to any part of the Website in breach of the
          Terms of Use, your right to use the Website will cease immediately and
          you must, at our option, return or destroy any copies of the materials
          you have made. No right, title or interest in or to the Website or any
          content on the Website is transferred to you, and all rights not
          expressly granted are reserved by the Company. Any use of the Website
          not expressly permitted by these Terms of Use is a breach of these
          Terms of Use and may violate copyright, trademark and other laws.
        </p>
        <p>
          <span className="underline">
            <strong>Trademarks</strong>
          </span>
        </p>
        <p>
          The Company name, the terms Mirror World, the Company logo and all
          related names, logos, product and service names, designs and slogans
          are trademarks of the Company or its affiliates or licensors. You must
          not use such marks without the prior written permission of the
          Company. All other names, logos, product and service names, designs
          and slogans on this Website are the trademarks of their respective
          owners.
        </p>
        <p>
          <span className="underline">
            <strong>Prohibited Uses</strong>
          </span>
        </p>
        <p>
          You may use the Website only for lawful purposes and in accordance
          with these Terms of Use. You agree not to use the Website:
        </p>
        <ul>
          <li>
            In any way that violates any applicable federal, state, local or
            international law or regulation (including, without limitation, any
            laws regarding the export of data or software to and from the US or
            other countries).
          </li>
          <li>
            For the purpose of exploiting, harming or attempting to exploit or
            harm minors in any way by exposing them to inappropriate content,
            asking for personally identifiable information or otherwise.
          </li>
          <li>
            To transmit, or procure the sending of, any advertising or
            promotional material, including any "junk mail," "chain letter,"
            "spam," or any other similar solicitation.
          </li>
          <li>
            To impersonate or attempt to impersonate the Company, a Company
            employee, another user or any other person or entity (including,
            without limitation, by using e-mail addresses associated with any of
            the foregoing).
          </li>
          <li>
            To engage in any other conduct that restricts or inhibits anyone's
            use or enjoyment of the Website, or which, as determined by us, may
            harm the Company or users of the Website, or expose them to
            liability.
          </li>
        </ul>
        <p>Additionally, you agree not to:</p>
        <ul>
          <li>
            Use the Website in any manner that could disable, overburden,
            damage, or impair the site or interfere with any other party's use
            of the Website, including their ability to engage in real time
            activities through the Website.
          </li>
          <li>
            Use any robot, spider or other automatic device, process or means to
            access the Website for any purpose, including monitoring or copying
            any of the material on the Website.
          </li>
          <li>
            Use any manual process to monitor or copy any of the material on the
            Website, or for any other purpose not expressly authorized in these
            Terms of Use, without our prior written consent.
          </li>
          <li>
            Use any device, software or routine that interferes with the proper
            working of the Website.
          </li>
          <li>
            Introduce any viruses, trojan horses, worms, logic bombs or other
            material which is malicious or technologically harmful.
          </li>
          <li>
            Attempt to gain unauthorized access to, interfere with, damage or
            disrupt any parts of the Website, the server on which the Website is
            stored, or any server, computer or database connected to the
            Website.
          </li>
          <li>
            Attack the Website via a denial-of-service attack or a distributed
            denial-of-service attack.
          </li>
        </ul>
        <ul>
          <li>
            Otherwise attempt to interfere with the proper working of the
            Website.
          </li>
        </ul>
        <p>
          <span className="underline">
            <strong>Monitoring and Enforcement; Termination</strong>
          </span>
        </p>
        <p>We have the right to:</p>
        <ul>
          <li>
            Remove or refuse to post any User Contributions for any or no reason
            in our sole discretion.
          </li>
          <li>
            Take any action with respect to any User Contribution that we deem
            necessary or appropriate in our sole discretion, including if we
            believe that such User Contribution violates the Terms of Use,
            including the Content Standards, infringes any intellectual property
            right or other right of any person or entity, threatens the personal
            safety of users of the Website or the public or could create
            liability for the Company.
          </li>
          <li>
            Disclose your identity or other information about you to any third
            party who claims that material posted by you violates their rights,
            including their intellectual property rights or their right to
            privacy.
          </li>
          <li>
            Take appropriate legal action, including without limitation,
            referral to law enforcement, for any illegal or unauthorized use of
            the Website.
          </li>
          <li>
            Terminate or suspend your access to all or part of the Website for
            any violation of these Terms of Use.
          </li>
        </ul>
        <p>
          Without limiting the foregoing, we have the right to fully cooperate
          with any law enforcement authorities or court order requesting or
          directing us to disclose the identity or other information of anyone
          posting any materials on or through the Website. YOU WAIVE AND HOLD
          HARMLESS THE COMPANY AND ITS AFFILIATES, LICENSEES AND SERVICE
          PROVIDERS FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF
          THE FOREGOING PARTIES DURING OR AS A RESULT OF ITS INVESTIGATIONS AND
          FROM ANY ACTIONS TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER
          SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.
        </p>
        <p>
          However, we do not undertake to review material before it is posted on
          the Website, and cannot ensure prompt removal of objectionable
          material after it has been posted. Accordingly, we assume no liability
          for any action or inaction regarding transmissions, communications or
          content provided by any user or third party. We have no liability or
          responsibility to anyone for performance or nonperformance of the
          activities described in this section.
        </p>
        <p>
          <span className="underline">
            <strong>Content Standards</strong>
          </span>
        </p>
        <p>
          These content standards apply to any and all User Contributions and
          use of Interactive Services. User Contributions must in their entirety
          comply with all applicable federal, state, local and international
          laws and regulations. Without limiting the foregoing, User
          Contributions must not:
        </p>
        <ul>
          <li>
            Contain any material which is defamatory, obscene, indecent,
            abusive, offensive, harassing, violent, hateful, inflammatory or
            otherwise objectionable.
          </li>
          <li>
            Promote sexually explicit or pornographic material, violence, or
            discrimination based on race, sex, religion, nationality,
            disability, sexual orientation or age.
          </li>
          <li>
            Infringe any patent, trademark, trade secret, copyright or other
            intellectual property or other rights of any other person.
          </li>
          <li>
            Violate the legal rights (including the rights of publicity and
            privacy) of others or contain any material that could give rise to
            any civil or criminal liability under applicable laws or regulations
            or that otherwise may be in conflict with these Terms of Use and
            our&nbsp;
            <span className="text-[rgb(0, 0, 255)] underline">
              <a target="_blank" href="https://mirrorworld.fun/privacy-policy">
                Privacy Policy
              </a>
            </span>
            .
          </li>
          <li>Be likely to deceive any person.</li>
          <li>
            Promote any illegal activity, or advocate, promote or assist any
            unlawful act.
          </li>
          <li>
            Cause annoyance, inconvenience or needless anxiety or be likely to
            upset, embarrass, alarm or annoy any other person.
          </li>
          <li>
            Impersonate any person, or misrepresent your identity or affiliation
            with any person or organization.
          </li>
          <li>
            Involve commercial activities or sales, such as contests,
            sweepstakes and other sales promotions, barter or advertising.
          </li>
          <li>
            Give the impression that they emanate from or are endorsed by us or
            any other person or entity, if this is not the case.
          </li>
        </ul>
        <p>
          <span className="underline">
            <strong>Reliance on Information Posted</strong>
          </span>
        </p>
        <p>
          The information presented on or through the Website is made available
          solely for general information purposes. We do not warrant the
          accuracy, completeness or usefulness of this information. Any reliance
          you place on such information is strictly at your own risk. We
          disclaim all liability and responsibility arising from any reliance
          placed on such materials by you or any other visitor to the Website,
          or by anyone who may be informed of any of its contents.
        </p>
        <p>
          This Website may include content provided by third parties, including
          materials provided by other users, bloggers and third-party licensors,
          syndicators, aggregators and/or reporting services. All statements
          and/or opinions expressed in these materials, and all articles and
          responses to questions and other content, other than the content
          provided by the Company, are solely the opinions and the
          responsibility of the person or entity providing those materials.
          These materials do not necessarily reflect the opinion of the Company.
          We are not responsible, or liable to you or any third party, for the
          content or accuracy of any materials provided by any third parties.
        </p>
        <p>
          <span className="underline">
            <strong>Changes to the Website</strong>
          </span>
        </p>
        <p>
          We may update the content on this Website from time to time, but its
          content is not necessarily complete or up-to-date. Any of the material
          on the Website may be out of date at any given time, and we are under
          no obligation to update such material.
        </p>
        <p>
          <span className="underline">
            <strong>
              Information About You and Your Visits to the Website
            </strong>
          </span>
        </p>
        <p>
          All information we collect on this Website is subject to our&nbsp;
          <span className="text-[rgb(0, 0, 255)] underline">
            <a target="_blank" href="https://mirrorworld.fun/privacy-policy">
              Privacy Policy
            </a>
          </span>
          . By using the Website, you consent to all actions taken by us with
          respect to your information in compliance with the Privacy Policy.
        </p>
        <p>
          <span className="underline">
            <strong>Linking to the Website and Social Media Features</strong>
          </span>
        </p>
        <p>
          You may link to our homepage, provided you do so in a way that is fair
          and legal and does not damage our reputation or take advantage of it,
          but you must not establish a link in such a way as to suggest any form
          of association, approval or endorsement on our part
        </p>
        <p>
          This Website may provide certain social media features that enable you
          to:
        </p>
        <ul>
          <li>
            Link from your own or certain third-party websites to certain
            content on this Website.
          </li>
          <li>
            Send e-mails or other communications with certain content, or links
            to certain content, on this Website.
          </li>
          <li>
            Cause limited portions of content on this Website to be displayed or
            appear to be displayed on your own or certain third-party websites.
          </li>
        </ul>
        <p>
          You may use these features solely as they are provided by us and
          solely with respect to the content they are displayed with. Subject to
          the foregoing, you must not:
        </p>
        <ul>
          <li>Establish a link from any website that is not owned by you.</li>
          <li>
            Cause the Website or portions of it to be displayed, or appear to be
            displayed by, for example, framing, deep linking or in-line linking,
            on any other site.
          </li>
          <li>Link to any part of the Website other than the homepage.</li>
          <li>
            Otherwise take any action with respect to the materials on this
            Website that is inconsistent with any other provision of these Terms
            of Use.
          </li>
        </ul>
        <p>
          The website from which you are linking, or on which you make certain
          content accessible, must comply in all respects with the Content
          Standards set out in these Terms of Use.
        </p>
        <p>
          You agree to cooperate with us in causing any unauthorized framing or
          linking immediately to cease. We reserve the right to withdraw linking
          permission without notice.
        </p>
        <p>
          We may disable all or any social media features and any links at any
          time without notice in our discretion.
        </p>
        <p>
          <span className="underline">
            <strong>Links from the Website</strong>
          </span>
        </p>
        <p>
          If the Website contains links to other sites and resources provided by
          third parties, these links are provided for your convenience only.
          This includes links contained in advertisements, including banner
          advertisements and sponsored links. We have no control over the
          contents of those sites or resources, and accept no responsibility for
          them or for any loss or damage that may arise from your use of them.
          If you decide to access any of the third party websites linked to this
          Website, you do so entirely at your own risk and subject to the terms
          and conditions of use for such websites.
        </p>
        <p>
          <span className="underline">
            <strong>Disclaimer of Warranties</strong>
          </span>
        </p>
        <p>
          You understand that we cannot and do not guarantee or warrant that
          files available for downloading from the internet or the Website will
          be free of viruses or other destructive code. You are responsible for
          implementing sufficient procedures and checkpoints to satisfy your
          particular requirements for anti-virus protection and accuracy of data
          input and output, and for maintaining a means external to our site for
          any reconstruction of any lost data. WE WILL NOT BE LIABLE FOR ANY
          LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK,
          VIRUSES OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR
          COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA OR OTHER PROPRIETARY
          MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS
          OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL
          POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
        </p>
        <p>
          YOUR USE OF THE WEBSITE, ITS CONTENT AND ANY SERVICES OR ITEMS
          OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS
          CONTENT AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE
          PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY
          WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY
          NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR
          REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY,
          RELIABILITY, QUALITY, ACCURACY OR AVAILABILITY OF THE WEBSITE. WITHOUT
          LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH
          THE COMPANY REPRESENTS OR WARRANTS THAT THE WEBSITE, ITS CONTENT OR
          ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE,
          RELIABLE, ERROR-FREE OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED,
          THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF
          VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE WEBSITE OR ANY
          SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL OTHERWISE MEET
          YOUR NEEDS OR EXPECTATIONS.
        </p>
        <p>
          THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER
          EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED
          TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT AND FITNESS FOR
          PARTICULAR PURPOSE.
        </p>
        <p>
          THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED
          OR LIMITED UNDER APPLICABLE LAW.
        </p>
        <p>
          <span className="underline">
            <strong>Limitation on Liability</strong>
          </span>
        </p>
        <p>
          TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COLLECTIVE
          LIABILITY OF THE COMPANY AND ITS SUBSIDIARIES AND AFFILIATES, AND
          THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, AND
          DIRECTORS, TO ANY PARTY (REGARDLESS OF THE FORM OF ACTION, WHETHER IN
          CONTRACT, TORT, OR OTHERWISE) EXCEED $10,000.
        </p>
        <p>
          The limitation of liability set out above does not apply to liability
          resulting from our gross negligence or willful misconduct.
        </p>
        <p>
          THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED
          OR LIMITED UNDER APPLICABLE LAW.
        </p>
        <p>
          <span className="underline">
            <strong>Indemnification</strong>
          </span>
        </p>
        <p>
          You agree to defend, indemnify and hold harmless the Company, its
          affiliates, licensors and service providers, and its and their
          respective officers, directors, employees, contractors, agents,
          licensors, suppliers, successors and assigns from and against any
          claims, liabilities, damages, judgments, awards, losses, costs,
          expenses or fees (including reasonable attorneys' fees) arising out of
          or relating to your violation of these Terms of Use or your use of the
          Website, including, but not limited to, your User Contributions, any
          use of the Website's content, services and products other than as
          expressly authorized in these Terms of Use, or your use of any
          information obtained from the Website.
        </p>
        <p>
          <span className="underline">
            <strong>Governing Law and Jurisdiction</strong>
          </span>
        </p>
        <p>
          All matters relating to the Website and these Terms of Use, and any
          dispute or claim arising therefrom or related thereto (in each case,
          including non-contractual disputes or claims), shall be governed by
          and construed in accordance with the internal laws of the Cayman
          Islands without giving effect to any choice or conflict of law
          provision or rule (whether of the Cayman Islands or any other
          jurisdiction).
        </p>
        <p>
          Any legal suit, action or proceeding arising out of, or related to,
          these Terms of Use or the Website shall be instituted exclusively in
          the courts of the Cayman Islands. You waive any and all objections to
          the exercise of jurisdiction over you by such courts and to venue in
          such courts.
        </p>
        <p>
          <span className="underline">
            <strong>Arbitration</strong>
          </span>
        </p>
        <p>
          At Company's sole discretion, it may require You to submit any
          disputes arising from these Terms of Use or use of the Website,
          including disputes arising from or concerning their interpretation,
          violation, invalidity, non-performance, or termination, to final and
          binding arbitration under the Rules of Arbitration of the American
          Arbitration Association.
        </p>
        <p>
          <span className="underline">
            <strong>Limitation on Time to File Claims</strong>
          </span>
        </p>
        <p>
          ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING
          TO THESE TERMS OF USE OR THE WEBSITE MUST BE COMMENCED WITHIN ONE (1)
          YEAR AFTER THE CAUSE OF ACTION ACCRUES; OTHERWISE, SUCH CAUSE OF
          ACTION OR CLAIM IS PERMANENTLY BARRED.
        </p>
        <p>
          <span className="underline">
            <strong>Waiver and Severability</strong>
          </span>
        </p>
        <p>
          No waiver of by the Company of any term or condition set forth in
          these Terms of Use shall be deemed a further or continuing waiver of
          such term or condition or a waiver of any other term or condition, and
          any failure of the Company to assert a right or provision under these
          Terms of Use shall not constitute a waiver of such right or provision.
        </p>
        <p>
          If any provision of these Terms of Use is held by a court or other
          tribunal of competent jurisdiction to be invalid, illegal or
          unenforceable for any reason, such provision shall be eliminated or
          limited to the minimum extent such that the remaining provisions of
          the Terms of Use will continue in full force and effect.
        </p>
        <p>
          <span className="underline">
            <strong>Entire Agreement</strong>
          </span>
        </p>
        <p>
          The Terms of Use and our Privacy Policy constitute the sole and entire
          agreement between you and Mirror World Inc. with respect to the
          Website and supersede all prior and contemporaneous understandings,
          agreements, representations and warranties, both written and oral,
          with respect to the Website.
        </p>
        <p>
          <span className="underline">
            <strong>Your Comments and Concerns</strong>
          </span>
        </p>
        <p>This website is operated by Mirror World Inc.</p>
        <p>
          All notices of copyright infringement claims should be sent to the
          copyright agent designated in our Copyright Policy in the manner and
          by the means set forth therein.
        </p>
        <p>
          All other feedback, comments, requests for technical support and other
          communications relating to the Website should be directed to:
          support@sonic.game.
        </p>

        <p className="text-center mt-20">
          Addendum 1: Sonic Odyssey Additional Terms of Use
        </p>
        <p>
          Subject to the Terms of Use above, the Odyssey Additional Terms of Use
          further govern your access to and use of Sonic Odyssey, including any
          content, functionality and services offered on or through Sonic
          Odyssey (the "<strong>Odyssey</strong>"), whether as a guest or a
          registered user.
        </p>
        <p>
          <span className="underline">
            <strong>Blockchain Wallet</strong>
          </span>
        </p>
        <p>
          The Odyssey campaign will require you to connect with certain digital
          wallets. Currently, we support the following wallets provided through
          third parties. You must read and check with the terms of use
          prescribed by these third-party providers from time to time.
        </p>
        <p>Supporting wallet includes:</p>
        <ul>
          <li>OKX Wallet</li>
          <li>Nightly</li>
          <li>Backpack</li>
        </ul>
        <p>
          <span className="underline">
            <strong>Rings</strong>
          </span>
        </p>
        <p>
          Odyssey aims to help more users learn about and experience Sonic. We
          have adopted Rings as an essential component of this campaign.
        </p>
        <p>You can obtain Rings by completing certain Tasks.</p>
        <p>
          You understand that Rings have no intrinsic value. They are used as a
          means to record user’s engagement with the Sonic ecosystem.
        </p>
        <p>
          <span className="underline">
            <strong>Tasks</strong>
          </span>
        </p>
        <p>
          The tasks provided by Odyssey are intended solely for educational and
          entertainment purposes. While we strive to ensure the accuracy and
          reliability of the information presented, Odyssey makes no warranties
          or representations about the completeness, accuracy, or suitability of
          the tasks for any purpose.
        </p>
        <p>
          By participating in these tasks, users acknowledge and agree that they
          do so at their own risk. Odyssey, its affiliates, and its partners are
          not liable for any direct, indirect, incidental, special, or
          consequential damages arising out of or in connection with the use or
          inability to use the tasks provided.
        </p>
        <p>
          Users are encouraged to seek professional advice or consultation where
          appropriate. Odyssey expressly disclaims any and all liability for any
          claims, demands, or damages of any kind arising out of or in
          connection with the use of these tasks.
        </p>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}
