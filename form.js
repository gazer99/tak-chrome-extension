class FORM {
    static createProfileForm(profile){
        const modal = document.createElement('div');

        let projectOptions = '<option value=""></option><option value="Product Manager">Product Manager</option><option value="Product Owner">Product Owner</option> <option value="Product Coach">Product Coach</option>';
        let acquisitionOptions = '<option value="Approche directe">Approche directe</option><option value="Annonce Linkedin">Annonce Linkedin</option> <option value="Cooptation">Cooptation</option><option value="Cabinet">Cabinet</option>';

        profile.projects.forEach(p => {
            projectOptions += `<option value="${p}">${p}</option>`;
        });

        profile.acquisitions.forEach(a => {
            acquisitionOptions += `<option value="${a}">${a}</option>`;
        });
        

        modal.innerHTML = `
            <div class="modal" id="profile-modal">
                <div class="header-modal">
                    <h2>Airtable Contact Profile</h2>
                </div>
                <div id="errors"></div>
                <div class="modal-content">
                    <form method="post" class="my-form" id="profile-form">
                        <div class="form-group">
                            <label>Contact Info</label>

                            <div class="field-form">
                                <label for="fullname" class="label-form">Nom</label>
                                <input type="text" id="fullname" name="fullname" value="${profile.fullName}"class="input-form"/>
                            </div>
                            
                            <div class="field-form">
                                <label for="phoneNumber" class="label-form">Tél</label>
                                <input type="tel" id="phoneNumber" name="phoneNumber" value="${profile.phoneNumber}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="email" class="label-form">Email</label>
                                <input type="email" id="email" name="email" value="${profile.emailAddress}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="publicUrl" class="label-form">Linkedin</label>
                                <input type="text" id="publicUrl" name="publicUrl" value="${profile.profileUrl}" class="input-form"/>
                            </div>
                        </div>                    

                        <div class="form-group">
                            <label>Organization</label>

                            <div class="field-form">
                                <label for="company" class="label-form">Société</label>
                                <input type="text" id="company" name="company" value="${profile.company}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="title" class="label-form">Titre</label>
                                <input type="text" id="title" name="title" value="${profile.title}" class="input-form"/>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Additional Info</label>

                            <div class="field-form">
                                <label for="status" class="label-form">Statut</label>
                                <input type="text" id="status" name="status" value="${profile.status}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="comments" class="label-form">Comments</label>
                                <input type="text" id="comments" name="comments" value="${profile.comments}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="owner" class="label-form">Owner</label>
                                <input type="text" id="owner" name="owner" value="${profile.owner}" class="input-form"/>
                            </div>
                            
                            <div class="field-form">
                                <label for="project" class="label-form">Profil</label>
                                <select name="project">
                                    ${projectOptions}
                                </select>
                            </div>

                            <div class="field-form">
                                <label for="acquisition" class="label-form">Acquisition</label>
                                <select name="acquisition">
                                    ${acquisitionOptions}
                                </select>
                            </div>

                            <div class="field-form">
                                <label class="label-form" for="quiz">Quiz</label>
                                <input type="checkbox" id="quiz" name="quiz" class="checkbox-form"/>
                            </div>

                            <div class="field-form">
                                <label for="keyword" class="label-form">Mots clés</label>
                                <input type="text" id="keyword" name="keyword" class="input-form"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="footer-modal">
                        <button type="submit" id="profile-cancel-button" class="btn cancel-btn">Annuler</button>
                        <button type="submit" id="profile-send-button"class="btn submit-btn">Envoyer</button>
                </div>
            </div> 
        `;

        return modal;
    }

    static createRecruiterForm(recruiter){
        const modal = document.createElement('div');

        modal.innerHTML = `
            <div class="modal" id="recruiter-modal">
                <div class="header-modal">
                    <h2 style="color: white !important;">Airtable Recruiter Profile</h2>
                </div>
                <div id="errors"></div>
                <div class="modal-content">
                    <form method="post" class="my-form" id="recruiter-form">
                        <div class="form-group">
                            <label>Recruiter Contact Info</label>

                            <div class="field-form">
                                <label for="fullname" class="label-form">Nom</label>
                                <input type="text" id="fullname" name="fullname" value="${recruiter.fullName}"class="input-form"/>
                            </div>
                            
                            <div class="field-form">
                                <label for="email" class="label-form">Email</label>
                                <input type="email" id="email" name="email" value="${recruiter.email}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="contactPhone" class="label-form">Tél</label>
                                <input type="tel" id="contactPhone" name="contactPhone" value="${recruiter.contactPhone}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="publicUrl" class="label-form">Linkedin</label>
                                <input type="text" id="publicUrl" name="publicUrl" value="${recruiter.profileUrl}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="project" class="label-form">Profil</label>
                                <input type="text" id="project" name="project" value="${recruiter.project}" class="input-form"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Additional Info</label>

                            <div class="field-form">
                                <label for="comments" class="label-form">Comments</label>
                                <input type="text" id="comments" name="comments" value="${recruiter.comments}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="status" class="label-form">Statut</label>
                                <input type="text" id="status" name="status" value="${recruiter.status}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label for="owner" class="label-form">Owner</label>
                                <input type="text" id="owner" name="owner" value="${recruiter.owner}" class="input-form"/>
                            </div>

                            <div class="field-form">
                                <label class="label-form" for="quiz">Quiz</label>
                                <input type="checkbox" id="quiz" name="quiz" class="checkbox-form"/>
                            </div>

                            <div class="field-form">
                                <label for="keyword" class="label-form">Mots clés</label>
                                <input type="text" id="keyword" name="keyword" class="input-form"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="footer-modal">
                        <button type="submit" id="recruiter-cancel-button" class="btn cancel-btn">Annuler</button>
                        <button type="submit" id="recruiter-send-button"class="btn submit-btn">Envoyer</button>
                </div>
            </div> 
        `;

        return modal;
    }
    
    static closeMenu(modal) {
        modal.remove();
    }
}
