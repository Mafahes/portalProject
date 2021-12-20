import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Form, FormArray, FormBuilder } from '@angular/forms';
import { StructureObject } from '../../../shared/interfaces/structure';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss'],
})
export class StructureComponent implements OnInit {
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private app: AppComponent
  ) {}
  form = this.fb.group({
    id: 0,
    manages: this.fb.array([]),
    name: '',
  });
  getControls(manageId = -1, units = -1, postion = -1): FormArray {
    if (manageId === -1) {
      return this.form.controls['manages'] as FormArray;
    }
    if (manageId !== -1 && units === -1 && postion === -1) {
      return (this.form.controls['manages'] as FormArray)['controls'][
        manageId
      ].get('units') as FormArray;
    }
    if (manageId !== -1 && units !== -1 && postion !== -1) {
      return (
        (this.form.controls['manages'] as FormArray)['controls'][manageId].get(
          'units'
        ) as FormArray
      )['controls'][units].get('postions') as FormArray;
    }
    var manages = this.form.controls['manages'] as FormArray;
    var unitss = manages['controls'][manageId].get('units') as FormArray;
    var postions = unitss['controls'][units].get('postions') as FormArray;
    return postions;
  }

  addManages(val: any): void {
    (this.form.controls['manages'] as FormArray).push(
      this.fb.group({
        id: 0,
        orgId: 0,
        name: val,
        units: this.fb.array([]),
      })
    );
  }
  removeManage(manageId: any): void {
    (this.form.controls['manages'] as FormArray).removeAt(manageId);
  }
  addUnit(manageIndex: number, val: any): void {
    let unit = (this.form.controls['manages'] as FormArray).controls[
      manageIndex
    ].get('units') as FormArray;
    unit.push(
      this.fb.group({
        id: 0,
        manageId: 0,
        name: val,
        postions: this.fb.array([]),
      })
    );
  }
  removeUnit(manageId: any, unitId: any): void {
    let unit = (this.form.controls['manages'] as FormArray).controls[
      manageId
    ].get('units') as FormArray;
    unit.removeAt(unitId);
  }
  addpostion(manageIndex: number, unitIndex: number, val: any): void {
    let postion = (
      (this.form.controls['manages'] as FormArray).controls[manageIndex].get(
        'units'
      ) as FormArray
    ).controls[unitIndex].get('postions') as FormArray;
    postion.push(
      this.fb.group({
        id: 0,
        name: val,
      })
    );
  }
  removepostion(manageIndex: any, unitIndex: any, postionId: any): void {
    let postion = (
      (this.form.controls['manages'] as FormArray).controls[manageIndex].get(
        'units'
      ) as FormArray
    ).controls[unitIndex].get('postions') as FormArray;
    postion.removeAt(postionId);
  }
  isAdd = false;
  isEdit = false;
  // @ts-ignore
  structure: StructureObject;
  // @ts-ignore
  structureSrc: StructureObject;
  search: any;
  async ngOnInit(): Promise<void> {
    this.app.loading = true;
    this.structure = await this.api.getStructure().toPromise();
    this.structureSrc = JSON.parse(JSON.stringify(this.structure));
    this.app.loading = false;
  }
  filter(s: any): void {
    this.structureSrc.data = JSON.parse(
      JSON.stringify(
        this.structure.data.filter((e) =>
          !!s
            ? e.name.toLocaleLowerCase().includes(s.toLowerCase()) ||
              e.manages.some((e) =>
                e.name.toLowerCase().includes(s.toLowerCase())
              ) ||
              e.manages.some((e) =>
                e.units.some((e2) =>
                  e2.name.toLowerCase().includes(s.toLowerCase())
                )
              ) ||
              e.manages.some((e) =>
                e.units.some((e2) =>
                  e2.postions.some((e3) =>
                    e3.name.toLowerCase().includes(s.toLowerCase())
                  )
                )
              )
            : true
        )
      )
    );
    if (!s) {
      this.structureSrc.data = JSON.parse(JSON.stringify(this.structure.data));
    }
  }
  async switchEdit(id: any): Promise<void> {
    var scheme = await this.api.getOrgSchemeById(id).toPromise();
    this.form.patchValue({
      id: scheme.id,
      name: scheme.name,
    });
    scheme.manages.forEach((e, i) => {
      (this.form.controls['manages'] as FormArray).push(
        this.fb.group({
          id: e.id,
          orgId: e.orgId,
          name: e.name,
          units: this.fb.array([]),
        })
      );
      e.units.forEach((e2, i2) => {
        console.log(
          (this.form.controls['manages'] as FormArray).controls.length
        );
        (
          (this.form.controls['manages'] as FormArray).controls[i].get(
            'units'
          ) as FormArray
        ).push(
          this.fb.group({
            id: e2.id,
            manageId: e2.manageId,
            name: e2.name,
            postions: this.fb.array([]),
          })
        );
        e2.postions.forEach((e3, i3) => {
          (
            (
              (this.form.controls['manages'] as FormArray).controls[i].get(
                'units'
              ) as FormArray
            ).controls[i2].get('postions') as FormArray
          ).push(
            this.fb.group({
              id: e3.id,
              name: e3.name,
            })
          );
        });
      });
    });
    this.isEdit = true;
    this.isAdd = true;
  }
  async deleteStructure(id: any): Promise<void> {
    this.app.loading = true;
    await this.api.deleteOrgScheme(id).toPromise();
    this.structure = await this.api.getStructure().toPromise();
    this.structureSrc = this.structure;
    this.app.loading = false;
  }
  resetForm(): void {
    this.form.patchValue({
      id: 0,
      name: '',
    });
    (this.form.controls['manages'] as FormArray).clear();
  }
  async submit(): Promise<void> {
    this.app.loading = true;
    await (this.isEdit
      ? this.api.updateOrgScheme(this.form.value)
      : this.api.createOrgScheme(this.form.value)
    ).toPromise();
    this.structure = await this.api.getStructure().toPromise();
    this.structureSrc = this.structure;
    this.resetForm();
    this.isAdd = false;
    this.isEdit = false;
    this.app.loading = false;
  }
}
