import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-settings',
  templateUrl: './state-settings.component.html',
  styleUrls: ['./state-settings.component.scss']
})
export class StateSettingsComponent implements OnInit {

  isConversation: boolean = true;
  detailsHidden: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleDetails(){
    this.detailsHidden = !this.detailsHidden;
    console.log('Actual details visibility: ',this.detailsHidden);
  }

  toggleCall(){
    this.isConversation = !this.isConversation;
    console.log('Call status: ',this.isConversation? 'active' : 'inactive');
  }

}

export class BaseActivity {
  protected _activityType: ActivitiesType;
  public get activityType(): ActivitiesType {
    return this._activityType;
  }

  private _isActive: boolean = false;
  public get isActive(): boolean {
    return this._isActive;
  }

  constructor() { 
  }

  getActivityKey(activity?: ActivitiesType) {
    return Object.keys(ActivitiesType).find( a => ActivitiesType[a] === ( activity? activity : this._activityType) );
  }

  run() {
    this._isActive = true;
  }

  stop() {
    this._isActive = false;
  }
}

export class ConversationActivity extends BaseActivity{

  private _features: Array<BaseActivity> = [];
  public get features(): Array<BaseActivity> {
    return this._features;
  }

  constructor(allowedFeatures: Array<ActivitiesType>){
    super();
    this._activityType = ActivitiesType.Conversation;
    this.addEnabledFeatures(allowedFeatures);
  }

  addEnabledFeatures(features: Array<ActivitiesType>) {
    features.forEach((feature: ActivitiesType) => {
      let allowedFeature: boolean = true;
      let activity: BaseActivity;
      switch(feature) {
        case ActivitiesType.Video: {
          activity = new VideoActivity();
          break;
        }
        case ActivitiesType.Chat: {
          activity = new ChatActivity();
          break;
        }
        case ActivitiesType.CoBrowsing: {
          activity = new CoBrowsingActivity();
          break;
        }
        case ActivitiesType.Verification: {
          activity = new VerificationActivity();
          break;
        }
        case ActivitiesType.KioskPreview: {
          activity = new KioskPreviewActivity();
          break;
        }
        case ActivitiesType.KioskReconnect: {
          activity = new KioskReconnectnActivity();
          break;
        }
        default: {
          allowedFeature = false;
          console.error(`Can't add ${this.getActivityKey(feature)} into ${this.getActivityKey()}`);
          break;
        }
      }
      if(allowedFeature  && this._features.findIndex(x => x === activity) === -1){
        this._features.push(activity)
      }
    })
  }
}

export class VideoActivity extends BaseActivity {

  constructor() {
    super();
    this._activityType = ActivitiesType.Video
  }
}

export class ChatActivity extends BaseActivity {

  constructor() {
    super();
    this._activityType = ActivitiesType.Chat
  }
}
export class CoBrowsingActivity extends BaseActivity {

  constructor() {
    super();
    this._activityType = ActivitiesType.CoBrowsing
  }
}
export class VerificationActivity extends BaseActivity {

  constructor() {
    super();
    this._activityType = ActivitiesType.Verification
  }
}

export class KioskPreviewActivity extends BaseActivity {

  constructor() {
    super();
    this._activityType = ActivitiesType.KioskPreview
  }
}

export class KioskReconnectnActivity extends BaseActivity {

  constructor() {
    super();
    this._activityType = ActivitiesType.KioskReconnect
  }
}


export enum ActivitiesType {
  Conversation = 0,
  Video = 1,
  Chat = 2,
  CoBrowsing = 3,
  Verification = 4,
  KioskPreview = 5,
  KioskReconnect = 6,
}